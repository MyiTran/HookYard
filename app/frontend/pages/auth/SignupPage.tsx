import { useState } from "react";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError("");

    if (password !== passwordConfirmation) {
      setError("Password confirmation does not match!");
      return;
    }

    setLoading(true);

    const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;

    try {
      const response = await fetch("/users", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken || "",
        },
        body: JSON.stringify({ 
            user: { name, email, password, password_confirmation: passwordConfirmation,},
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.errors?.join(", ") || "Unable to create your account!");
        return;
      }

      window.location.href = "/";
    } catch {
      setError("Cannot connect to the server. Please try again!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EBEFEC] p-6 text-[#17211B]">
      <main className="grid min-h-[700px] w-full max-w-6xl overflow-hidden rounded-[28px] border border-[#C8DACD] bg-white shadow-[0_24px_70px_rgba(32,78,53,0.10)] lg:grid-cols-2">
        <section className="hidden flex-col bg-[#DFECE1] p-12 lg:flex lg:p-16">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Hook<span className="text-[#23613F]">Yard</span>
            </h1>
            <p className="mt-2 text-xs font-medium uppercase tracking-[4px] text-[#65766B]">Webhook operations</p>
          </div>

          <div className="my-auto">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-[#718278]">Create your workspace</p>
            <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-tight tracking-tight lg:text-5xl">
              Build and monitor your webhook projects.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#607267]">
              Create projects, manage endpoints and investigate every webhook delivery.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm font-medium text-[#53665A]">
            <span className="h-2 w-2 rounded-full bg-[#43AD61]" />
            <span>All systems operational</span>
          </div>
        </section>

        <section className="flex items-center justify-center p-8 sm:p-12 lg:p-16">
          <div className="w-full max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-[#718278]">Get started</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight">Create account</h2>
            <p className="mt-3 text-base text-[#718078]">Create your HookYard support account.</p>

            <form
              className="mt-8 space-y-5"
              onSubmit={async (event) => {
                event.preventDefault();
                await handleSubmit();
              }}
            >
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold">Name</label>
                <input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  className="h-12 w-full rounded-xl border border-[#C9DACE] px-4 outline-none focus:border-[#23613F] focus:ring-2 focus:ring-[#23613F]/10"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="h-12 w-full rounded-xl border border-[#C9DACE] px-4 outline-none focus:border-[#23613F] focus:ring-2 focus:ring-[#23613F]/10"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  required
                  className="h-12 w-full rounded-xl border border-[#C9DACE] px-4 outline-none focus:border-[#23613F] focus:ring-2 focus:ring-[#23613F]/10"
                />
              </div>

              <div>
                <label htmlFor="passwordConfirmation" className="mb-2 block text-sm font-semibold">Confirm password</label>
                <input
                  id="passwordConfirmation"
                  type="password"
                  value={passwordConfirmation}
                  onChange={(event) => setPasswordConfirmation(event.target.value)}
                  placeholder="Enter your password again"
                  autoComplete="new-password"
                  required
                  className="h-12 w-full rounded-xl border border-[#C9DACE] px-4 outline-none focus:border-[#23613F] focus:ring-2 focus:ring-[#23613F]/10"
                />
              </div>

              {error && <p className="rounded-xl bg-[#FBEEEE] px-4 py-3 text-sm text-[#B42318]">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-[#214E35] font-semibold text-white transition hover:bg-[#173D28] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#718078]">
              Already have an account?{" "}
              <a href="/users/sign_in" className="font-semibold text-[#23613F] hover:underline">Sign in</a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignupPage;
