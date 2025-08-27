import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Search, Filter, Folder, Calendar, User, Edit, Trash2, Eye } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import { formatDate } from '../utils/formatters';
import { Project } from '../types';

const Projects: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [tagFilter, setTagFilter] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const [newProject, setNewProject] = useState({
    name: '',
    status: 'planned' as Project['status'],
    description: '',
    tags: '',
    tasks: '',
  });

  // Get all unique tags for filter
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = !searchQuery || 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tasks.some(task => task.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = !statusFilter || project.status === statusFilter;
      const matchesTag = !tagFilter || project.tags.includes(tagFilter);
      
      return matchesSearch && matchesStatus && matchesTag;
    });
  }, [projects, searchQuery, statusFilter, tagFilter]);

  const statusBadgeVariant = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'on-hold': return 'warning';
      case 'planned': return 'default';
      default: return 'default';
    }
  };

  const statusBadgeText = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'on-hold': return 'On Hold';
      case 'planned': return 'Planned';
      default: return status;
    }
  };

  const handleAddProject = () => {
    if (!newProject.name.trim()) return;

    const tasksArray = newProject.tasks.split(',')
      .map(task => task.trim())
      .filter(task => task.length > 0)
      .map((taskName, index) => ({
        id: `task-${Date.now()}-${index}`,
        name: taskName,
        completed: false,
        createdAt: new Date().toISOString(),
      }));

    const tagsArray = newProject.tags.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    addProject({
      name: newProject.name,
      status: newProject.status,
      description: newProject.description,
      tags: tagsArray,
      tasks: tasksArray,
      progress: newProject.status === 'completed' ? 100 : 
               newProject.status === 'planned' ? 0 : 
               Math.floor(Math.random() * 80) + 10,
      owner: 'You',
    });

    setNewProject({
      name: '',
      status: 'planned',
      description: '',
      tags: '',
      tasks: '',
    });
    setShowAddModal(false);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject({ ...project });
  };

  const handleUpdateProject = () => {
    if (!editingProject) return;

    const updates: Partial<Project> = {
      name: editingProject.name,
      status: editingProject.status,
      description: editingProject.description,
      tags: editingProject.tags,
      progress: editingProject.status === 'completed' ? 100 : 
               editingProject.status === 'planned' ? 0 : 
               editingProject.progress,
    };

    updateProject(editingProject.id, updates);
    setEditingProject(null);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjectToDelete(projectId);
    setShowDeleteModal(true);
  };

  const confirmDeleteProject = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete);
      setProjectToDelete(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Projects
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and track your project portfolio ({filteredProjects.length} projects)
          </p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              placeholder="Search projects and tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-4 w-4 text-gray-400" />}
            />
          </div>
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">All Status</option>
              <option value="planned">Planned</option>
              <option value="in-progress">In Progress</option>
              <option value="on-hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div>
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} hover className="h-full flex flex-col">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Folder className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <Badge variant={statusBadgeVariant(project.status)} size="sm">
                    {statusBadgeText(project.status)}
                  </Badge>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditProject(project)}
                    className="p-1"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {project.name}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {project.description}
              </p>
              
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="default" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{project.owner}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(project.createdAt)}</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {project.tasks.length} tasks • {project.tasks.filter(t => t.completed).length} completed
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No projects found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchQuery || statusFilter || tagFilter 
                ? 'Try adjusting your search filters'
                : 'Get started by creating your first project'
              }
            </p>
            {!searchQuery && !statusFilter && !tagFilter && (
              <Button onClick={() => setShowAddModal(true)}>
                Create Project
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Add Project Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Project"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Project Name"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            placeholder="Enter project name"
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={newProject.status}
              onChange={(e) => setNewProject({ ...newProject, status: e.target.value as Project['status'] })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="planned">Planned</option>
              <option value="in-progress">In Progress</option>
              <option value="on-hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Enter project description"
              rows={3}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          
          <Input
            label="Tags"
            value={newProject.tags}
            onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
            placeholder="Enter tags separated by commas"
            helper="e.g. React, TypeScript, Node.js"
          />
          
          <Input
            label="Tasks"
            value={newProject.tasks}
            onChange={(e) => setNewProject({ ...newProject, tasks: e.target.value })}
            placeholder="Enter tasks separated by commas"
            helper="e.g. Setup project, Design UI, Implement features"
          />
          
          <div className="flex space-x-3 pt-4">
            <Button onClick={handleAddProject} className="flex-1">
              Create Project
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowAddModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Project Modal */}
      <Modal
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
        title="Edit Project"
        size="lg"
      >
        {editingProject && (
          <div className="space-y-4">
            <Input
              label="Project Name"
              value={editingProject.name}
              onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
              placeholder="Enter project name"
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={editingProject.status}
                onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as Project['status'] })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="on-hold">On Hold</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                placeholder="Enter project description"
                rows={3}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            
            <Input
              label="Tags"
              value={editingProject.tags.join(', ')}
              onChange={(e) => setEditingProject({ 
                ...editingProject, 
                tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
              })}
              placeholder="Enter tags separated by commas"
              helper="e.g. React, TypeScript, Node.js"
            />
            
            <Input
              label="Progress (%)"
              type="number"
              min="0"
              max="100"
              value={editingProject.progress.toString()}
              onChange={(e) => setEditingProject({ ...editingProject, progress: parseInt(e.target.value) || 0 })}
            />
            
            <div className="flex space-x-3 pt-4">
              <Button onClick={handleUpdateProject} className="flex-1">
                Update Project
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setEditingProject(null)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Project"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to delete this project? This action cannot be undone.
          </p>
          
          <div className="flex space-x-3">
            <Button 
              variant="danger" 
              onClick={confirmDeleteProject}
              className="flex-1"
            >
              Delete
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Projects;