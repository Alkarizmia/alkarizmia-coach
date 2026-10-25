/**
 * Réalisations — ScanPlay & PayPulss.
 * Images et liens : placeholders / à compléter.
 */
export default function Realisations() {
  return (
    <section
      id="realisations"
      className="section"
      aria-labelledby="realisations-title"
    >
      <div className="container">
        <h2 id="realisations-title">Réalisations</h2>

        <div className="realisations-grid">
          <article>
            <div className="placeholder-media" role="img" aria-label="Aperçu ScanPlay — image à compléter">
              [Image ScanPlay — À COMPLÉTER]
            </div>
            <h3>ScanPlay</h3>
            <p>[À COMPLÉTER]</p>
            <a href="[LIEN À COMPLÉTER]" target="_blank" rel="noopener noreferrer">
              Voir le site
            </a>
          </article>

          <article>
            <div className="placeholder-media" role="img" aria-label="Aperçu PayPulss — image à compléter">
              [Image PayPulss — À COMPLÉTER]
            </div>
            <h3>PayPulss</h3>
            <p>[À COMPLÉTER]</p>
            <a href="[LIEN À COMPLÉTER]" target="_blank" rel="noopener noreferrer">
              Voir le site
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
