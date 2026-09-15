import { useEffect, useState } from "react";
import type { Project } from "../../../types/project";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const response = await fetch("/projects", { headers: { Accept: "application/json" } });
    const data = await response.json();
    if (response.ok) setProjects(data.projects);
  }

  async function createProject() {
    setError("");

    const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;
    const response = await fetch("/projects", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken || "",
      },
      body: JSON.stringify({ project: { name, description } }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.errors?.join(", ") || "Cannot create project!");
      return;
    }

    setProjects([...projects, data.project]);
    setName("");
    setDescription("");
    setShowForm(false);
  }

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[2px] text-[#5D7063]">Workspace</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Projects</h2>
          <p className="mt-2 text-sm text-[#53665A]">Manage your webhook projects and collaborators.</p>
        </div>

        <button type="button" onClick={() => setShowForm(true)} className="rounded-xl bg-[#214E35] px-5 py-3 text-sm font-semibold text-white hover:bg-[#173D28]">
          Create project
        </button>
      </div>

      {showForm && (
        <section className="mt-8 rounded-[18px] border border-[#D8E3DB] bg-white p-6">
          <h3 className="text-lg font-semibold">New project</h3>

          <label htmlFor="name" className="mt-5 block text-sm font-semibold">Name</label>
          <input id="name" value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#C9DACE] px-4 outline-none focus:border-[#23613F]" />

          <label htmlFor="description" className="mt-5 block text-sm font-semibold">Description</label>
          <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} className="mt-2 min-h-24 w-full rounded-xl border border-[#C9DACE] p-4 outline-none focus:border-[#23613F]" />

          {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

          <div className="mt-5 flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-xl px-4 py-2 text-sm font-semibold text-[#53665A]">Cancel</button>
            <button type="button" onClick={createProject} disabled={!name.trim()} className="rounded-xl bg-[#214E35] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">Create</button>
          </div>
        </section>
      )}

      <section className="mt-8">
        {projects.length === 0 ? (
          <div className="rounded-[18px] border border-[#D8E3DB] bg-white p-10 text-center">
            <h3 className="text-lg font-semibold">No projects yet</h3>
            <p className="mt-2 text-sm text-[#607267]">Create your first project to start managing webhook deliveries.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="rounded-[18px] border border-[#D8E3DB] bg-white p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold">{project.name}</h3>
                  <span className="rounded-full bg-[#E5F0E7] px-3 py-1 text-xs font-semibold text-[#23613F]">
                    {project.owner ? "Owner" : "Maintainer"}
                  </span>
                </div>

                <p className="mt-3 text-sm text-[#607267]">{project.description || "No description"}</p>
                <p className="mt-5 text-xs font-medium text-[#718278]">{project.members_count} collaborators</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProjectsPage;
