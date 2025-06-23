
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';

interface WorkspaceSelectionProps {
  onWorkspaceSelected: () => void;
  onBack: () => void;
}

export function WorkspaceSelection({ onWorkspaceSelected, onBack }: WorkspaceSelectionProps) {
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(null);

  const workspaces = [
    {
      id: 'collective',
      name: 'One Collective GmbH',
      description: '5 Members',
      avatar: 'O',
      bgColor: 'bg-gray-900',
      textColor: 'text-white'
    },
    {
      id: 'personal',
      name: 'Personal Space',
      description: '2 Members',
      avatar: 'PS',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    }
  ];

  const handleJoinWorkspace = (workspaceId: string) => {
    setSelectedWorkspace(workspaceId);
    setTimeout(() => {
      onWorkspaceSelected();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel */}
      <div className="flex-1 p-8 max-w-md">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mb-4 h-8 w-8 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm text-gray-500 mb-2">3/4</div>
          <div className="text-sm text-gray-500 mb-4">Workspace</div>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Join your company on Acme!
          </h1>
          <p className="text-gray-600 text-sm">
            These workspaces also anyone from anyone to join.
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {workspaces.map((workspace) => (
            <div
              key={workspace.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${workspace.bgColor} ${workspace.textColor} flex items-center justify-center text-sm font-medium`}>
                  {workspace.avatar}
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">
                    {workspace.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {workspace.description}
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleJoinWorkspace(workspace.id)}
                disabled={selectedWorkspace === workspace.id}
                className="bg-gray-900 hover:bg-gray-800 text-white text-sm px-4 py-2 h-8"
              >
                {selectedWorkspace === workspace.id ? 'Joining...' : 'Join'}
              </Button>
            </div>
          ))}
        </div>

        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <Plus className="h-4 w-4" />
          Create New Workspace
        </button>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-teal-800 p-8 text-white flex flex-col justify-end">
        <div className="max-w-sm">
          <p className="text-sm opacity-90 mb-4">
            "I used Acme because I knew they could deliver what I needed—someone 
            who had a robust portfolio and someone who specialized in producing 
            effective, consistent content that fits our strategy."
          </p>
          <div className="text-sm font-medium">
            Georgiana, PhD
          </div>
        </div>
      </div>
    </div>
  );
}
