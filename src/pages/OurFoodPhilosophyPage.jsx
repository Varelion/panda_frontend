import React from 'react';
import Header from '../shared/components/layout/Header';

function OurFoodPhilosophyPage() {
  return (
    <div className="min-h-screen themed-bg">
      <Header />
      <main className="pt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold themed-text-heavy mb-4">
              Our Philosophy
            </h1>
            <p className="text-xl themed-text max-w-3xl mx-auto">
              At Pandaren Express, we believe that RP is the most valuable part of the MMORPG. We
              believe that systems that promote diversity in roleplaying, be they first-party or
              not, are invaluable and aid in creating a novel experience.
            </p>
            <p className="pt-4 text-xl themed-text max-w-3xl mx-auto">
              We believe that the best kind of gameplay is <strong>emergent</strong>; the kind of
              gameplay created by a playerbase, for the playerbase, arising from a desire to be more
              involved in a game, a world, and a community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="themed-card p-8">
              <h2 className="text-2xl font-bold themed-text-heavy mb-4">
                What Is Emergent Gameplay?
              </h2>
              <p className="themed-text leading-relaxed">
                In the context of roleplay within an MMORPG, "emergent" refers to storylines,
                character developments, or interactions that arise organically from player decisions
                and in-world events, rather than being pre-scripted or planned.
              </p>
            </div>

            <div className="themed-card p-8">
              <h2 className="text-2xl font-bold themed-text-heavy mb-4">
                Traits of Emergent Gameplay
              </h2>
              <ul className="themed-text leading-relaxed list-disc list-inside space-y-2">
                <li className='list-none indent-4'>
                  <strong>Unscripted:</strong> Not prewritten or heavily preplanned. Outcomes evolve
                  from in-character choices.
                </li>
                <li className='list-none indent-4'>
                  <strong>Responsive:</strong> Develops in reaction to other players’ actions,
                  in-game events, or the game world.
                </li>
                <li className='list-none indent-4'>
                  <strong>Dynamic:</strong> The narrative can shift direction unpredictably based on
                  how players engage.
                </li>
                <li className='list-none indent-4'>
                  <strong>Player-driven:</strong> Story and character arcs are shaped through
                  collaboration, not imposed structure.
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mb-16">
            <div className="bg-[#d1282e] text-white p-12 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">Crafted Through Play</h2>
              <p className="text-lg max-w-4xl mx-auto leading-relaxed">
                Every story begins with a character. Every arc grows through interaction. We never
                compromise on player agency—and we never ignore the potential of shared, unscripted
                creativity. That’s the Pandaren Express roleplay philosophy.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎭</span>
              </div>
              <h3 className="text-xl font-bold themed-text-heavy mb-2">Authentic Characters</h3>
              <p className="themed-text">
                Roleplay shines when characters reflect internal goals, flaws, and player-driven
                values.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚔️</span>
              </div>
              <h3 className="text-xl font-bold themed-text-heavy mb-2">Fast & Reactive</h3>
              <p className="themed-text">
                Interaction-first gameplay lets RP shift quickly and respond to the unexpected.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold themed-text-heavy mb-2">Made With Story</h3>
              <p className="themed-text">
                Every scene builds lore. Every character matters. We honor the stories you make
                together.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OurFoodPhilosophyPage;
