import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError("");
    setLoading(true);

    const csrfToken = document
      .querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
      ?.getAttribute("content");

    try {
      const response = await fetch("/users/sign_in", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-Token": csrfToken || "",
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Email or password is incorrect.");
        return;
      }

      if (data.user.role === "admin") {
        window.location.href = "/admin";
        return;
      }

      if (data.user.role === "support") {
        window.location.href = "/";
        return;
      }

      setError("Your account does not have permission to access HookYard!");
    } catch {
      setError("Cannot connect to the server. Please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#EBEFEC] p-6 text-[#17211B]">
      <main className="mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl overflow-hidden rounded-[32px] border border-[#CBDDCF] bg-white shadow-[0_20px_60px_rgba(32,78,53,0.10)]">
        <section className="hidden w-3/5 flex-col bg-[#DFECE1] p-12 lg:flex">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Hook<span className="text-[#23613F]">Yard</span>
            </h1>

            <p className="mt-2 text-xs uppercase tracking-[4px] text-[#7A8A7F]">
              Webhook operations
            </p>
          </div>

          <div className="my-auto">
            <p className="text-xs uppercase tracking-[3px] text-[#7A8A7F]">
              Delivery infrastructure
            </p>

            <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-tight tracking-tight">
              Monitor every webhook delivery with confidence.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#68786D]">
              Track deliveries, investigate failures and replay webhooks from
              one secure workspace.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-[#59675E]">
            <span className="h-2 w-2 rounded-full bg-[#53B66A]" />
            <span>All systems operational</span>
          </div>
        </section>

        <section className="flex w-full items-center justify-center bg-white px-8 py-12 lg:w-2/5">
          <div className="w-full max-w-md">
            <p className="text-xs uppercase tracking-[3px] text-[#7A8A7F]">
              Secure access
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight">
              Welcome back
            </h2>

            <p className="mt-3 text-sm text-[#7A8A7F]">
              Enter your account details to continue.
            </p>

            <form
              className="mt-10"
              onSubmit={async (event) => {
                event.preventDefault();
                await handleSubmit();
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-[#CBDDCF] bg-white px-4 py-4 outline-none transition placeholder:text-[#A5B0A8] focus:border-[#23613F] focus:ring-2 focus:ring-[#23613F]/10"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-[#CBDDCF] bg-white px-4 py-4 outline-none transition placeholder:text-[#A5B0A8] focus:border-[#23613F] focus:ring-2 focus:ring-[#23613F]/10"
                />
              </div>

              {error && (
                <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-7 w-full rounded-xl bg-[#214E35] px-4 py-4 font-medium text-white transition hover:bg-[#183D29] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-8 text-center text-xs leading-5 text-[#8B968E]">
              Accounts are created and managed by a HookYard administrator.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LoginPage;
