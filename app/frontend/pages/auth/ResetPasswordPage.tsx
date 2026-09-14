import { useState } from "react";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = new URLSearchParams(window.location.search).get("reset_password_token");

  async function handleSubmit() {
    setError("");

    if (!token) {
      setError("Password reset link is invalid.");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Password confirmation does not match.");
      return;
    }

    setLoading(true);

    const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;

    try {
      const response = await fetch("/users/password", {
        method: "PATCH",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken || "",
        },
        body: JSON.stringify({
          user: {
            reset_password_token: token,
            password,
            password_confirmation: passwordConfirmation,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.errors?.join(", ") || "Unable to update password.");
        return;
      }

      window.location.href = "/users/sign_in";
    } catch {
      setError("Cannot connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EBEFEC] p-6 text-[#17211B]">
      <main className="w-full max-w-md rounded-[28px] border border-[#C8DACD] bg-white p-10 shadow-[0_24px_70px_rgba(32,78,53,0.10)]">
        <h1 className="text-3xl font-bold tracking-tight">
          Hook<span className="text-[#23613F]">Yard</span>
        </h1>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[3px] text-[#718278]">
          Account recovery
        </p>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight">
          Create new password
        </h2>

        <form
          className="mt-8 space-y-5"
          onSubmit={async (event) => {
            event.preventDefault();
            await handleSubmit();
          }}
        >
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold">
              New password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              required
              className="h-14 w-full rounded-xl border border-[#C9DACE] px-4 outline-none focus:border-[#23613F] focus:ring-2 focus:ring-[#23613F]/10"
            />
          </div>

          <div>
            <label htmlFor="passwordConfirmation" className="mb-2 block text-sm font-semibold">
              Confirm new password
            </label>

            <input
              id="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              autoComplete="new-password"
              required
              className="h-14 w-full rounded-xl border border-[#C9DACE] px-4 outline-none focus:border-[#23613F] focus:ring-2 focus:ring-[#23613F]/10"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-[#FBEEEE] px-4 py-3 text-sm text-[#B42318]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-14 w-full rounded-xl bg-[#214E35] font-semibold text-white transition hover:bg-[#173D28] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default ResetPasswordPage;
