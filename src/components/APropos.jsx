/** À propos — 3 phrases + emplacement photo */
export default function APropos() {
  return (
    <section id="a-propos" className="section" aria-labelledby="apropos-title">
      <div className="container">
        <h2 id="apropos-title">À propos</h2>

        <div className="placeholder-media" role="img" aria-label="Photo de Bilal — à compléter">
          [Photo — À COMPLÉTER]
        </div>

        <p>
          Je m’appelle Bilal. Je suis étudiant et je crée des sites web pour
          les coachs sportifs et les petites salles.
        </p>
        <p>
          Je pratique moi-même la musculation : je connais cet univers et ce
          dont vous avez besoin pour être trouvé et contacté.
        </p>
        <p>[À COMPLÉTER]</p>
      </div>
    </section>
  );
}
