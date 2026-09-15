import { useEffect, useState } from "react";
import type { Project } from "../../../types/project";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const response = await fetch("/admin/projects", { headers: { Accept: "application/json" } });
      const data = await response.json();

      if (!response.ok) {
        setError("Cannot load projects!");
        return;
      }

      setProjects(data.projects);
    } catch {
      setError("Cannot connect to the server!");
    }
  }

  return (
    <div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[2px] text-[#5D7063]">Administration</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Projects</h2>
        <p className="mt-2 text-sm text-[#53665A]">View all projects across the HookYard platform.</p>
      </div>

      {error && <p className="mt-6 rounded-xl bg-[#FBEEEE] px-4 py-3 text-sm text-[#B42318]">{error}</p>}

      <section className="mt-8">
        {projects.length === 0 ? (
          <div className="rounded-[18px] border border-[#D8E3DB] bg-white p-10 text-center">
            <h3 className="text-lg font-semibold">No projects yet</h3>
            <p className="mt-2 text-sm text-[#607267]">Projects created by Support users will appear here.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-[18px] border border-[#D8E3DB] bg-white">
            <div className="grid grid-cols-[2fr_2fr_1fr] gap-4 border-b border-[#E2EAE4] bg-[#F5F8F6] px-6 py-4 text-xs font-semibold uppercase tracking-[1px] text-[#607267]">
              <span>Project</span>
              <span>Owner</span>
              <span>Collaborators</span>
            </div>

            {projects.map((project) => (
              <div key={project.id} className="grid grid-cols-[2fr_2fr_1fr] gap-4 border-b border-[#E8EEE9] px-6 py-5 last:border-b-0">
                <div>
                  <p className="font-semibold">{project.name}</p>
                  <p className="mt-1 text-sm text-[#607267]">{project.description || "No description"}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold">{project.owner_name}</p>
                  <p className="mt-1 text-sm text-[#607267]">{project.owner_email}</p>
                </div>

                <p className="text-sm text-[#53665A]">{project.members_count}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProjectsPage;
