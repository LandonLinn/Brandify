
export default function Home() {
  return (
    <div className="dark min-h-dvh">
      <main className="container--sm section flex flex-col gap-6">
      
        {/* Title Section */}
        <div className="flex flex-col gap-4">
            <h1 className="text-on-dark font-black">Build Your <br /><span className="text-gradient">Brand Identity</span></h1>
            <p className="text-on-dark--muted">AI-powered brand kit — logo, voice, color, copy, and strategy in seconds.</p>
        </div>

        {/* Form */}
        <form
          className="min-h-dvh card flex flex-col gap-5"
        >
          <div className="flex flex-col gap-4">
            <label htmlFor="brand-name">Brand Name <span className="text-(--color-tertiary)">*</span></label>
            <input type="text" name="brand-name" placeholder="e.g. Lumio, Vault, Helio..."/>
          </div>
            
        </form>

      </main>
    </div>
  );
}
