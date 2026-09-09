function App() {
  return (
    <div className="min-h-screen bg-[#EBEFEC] text-[#17211B]">
      <div className="flex min-h-screen">
        <aside className="flex w-64 shrink-0 flex-col bg-[#DFECE1] px-6 py-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#17211B]">
              Hook<span className="text-[#23613F]">Yard</span>
            </h1>

            <p className="mt-1 text-xs uppercase tracking-[3px] text-[#7A8A7F]">
              Webhook operations
            </p>
          </div>

          <nav className="mt-12 space-y-2">
            <p className="mb-3 text-xs font-medium uppercase tracking-[2px] text-[#86968B]">
              Workspace
            </p>

            <a
              href="#"
              className="block rounded-xl bg-[#214E35] px-4 py-3 font-medium text-white shadow-sm"
            >
              Overview
            </a>

            <a
              href="#"
              className="block rounded-xl px-4 py-3 text-[#5F6E64] transition hover:bg-[#D2E2D6] hover:text-[#214E35]"
            >
              Deliveries
            </a>

            <a
              href="#"
              className="block rounded-xl px-4 py-3 text-[#5F6E64] transition hover:bg-[#D2E2D6] hover:text-[#214E35]"
            >
              Customers
            </a>

            <a
              href="#"
              className="block rounded-xl px-4 py-3 text-[#5F6E64] transition hover:bg-[#D2E2D6] hover:text-[#214E35]"
            >
              Endpoints
            </a>
          </nav>

          <div className="mt-auto">
            <a
              href="#"
              className="block rounded-xl px-4 py-3 text-[#5F6E64] transition hover:bg-[#D2E2D6] hover:text-[#214E35]"
            >
              Settings
            </a>
          </div>
        </aside>

        <main className="m-3 ml-0 flex min-w-0 flex-1 flex-col overflow-hidden rounded-[32px] border border-[#D0E0D4] bg-[#FAFCFA] shadow-[0_20px_60px_rgba(32,78,53,0.08)]">
          <header className="flex h-20 items-center justify-between border-b border-[#E3EAE5] bg-white px-8">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#8B968E]">HookYard</span>
              <span className="text-[#C7CEC9]">/</span>
              <span className="font-medium text-[#17211B]">Overview</span>
            </div>

            <div className="flex items-center gap-5">
              <button
                type="button"
                className="rounded-xl border border-[#DDE6DF] bg-white px-4 py-2 text-left transition hover:border-[#8FA697]"
              >
                <span className="block text-[10px] uppercase tracking-[2px] text-[#8B968E]">
                  Tenant
                </span>

                <span className="mt-0.5 block text-sm font-medium text-[#17211B]">
                  Acme Corporation
                </span>
              </button>

              <div className="h-9 w-px bg-[#E3EAE5]" />

              <button
                type="button"
                className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-[#F0F5F1]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#214E35] font-semibold text-white">
                  K
                </span>

                <span className="text-left">
                  <span className="block text-sm font-medium text-[#17211B]">
                    Hazel
                  </span>

                  <span className="block text-xs text-[#8B968E]">
                    Administrator
                  </span>
                </span>
              </button>
            </div>
          </header>

          <div className="flex-1 p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[2px] text-[#8B968E]">
                  System overview
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#17211B]">
                  Welcome back, Hazel
                </h2>

                <p className="mt-2 text-sm text-[#78847C]">
                  Monitor webhook activity and delivery health.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-full border border-[#DDE6DF] bg-white px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#53B66A]" />

                <span className="text-sm text-[#59675E]">
                  All systems operational
                </span>
              </div>
            </div>

            <section className="mt-8 min-h-[500px] rounded-[24px] border border-[#E0E8E2] bg-white p-8 shadow-[0_8px_30px_rgba(32,78,53,0.05)]">
              <p className="text-sm text-[#8B968E]">
                Dashboard content will be added here.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
