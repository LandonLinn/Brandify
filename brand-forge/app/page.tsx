import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="dark h-screen">
      <main className="">
        {/* Header */}
        <Header />

        {/* ---- Main Content ---- */}
            <div>
                {/* Title Section */}
                <div className="container section">
                    <h1 className="text-on-dark font-black">Build Your <br /><span className="text-gradient">Brand Identity</span></h1>
                    <p className="text-on-dark--muted">AI-powered brand kit — logo, voice, color, copy, and strategy in seconds.</p>
                </div>

                {/* Form */}

            </div>
      </main>
    </div>
  );
}
