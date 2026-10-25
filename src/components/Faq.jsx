/** FAQ — accordéon (details / summary, sans JS) */
const QUESTIONS = [
  {
    q: "Quel est le délai de livraison ?",
    a: "Environ 10 jours après notre échange, dès que j'ai vos contenus (textes, photos, logo si vous en avez un). Une page seule est souvent prête en une semaine ; un site de 5 pages ou plus demande plutôt deux semaines. Le délai est confirmé avant de commencer.",
  },
  {
    q: "Qui possède le domaine ?",
    a: "Vous. Le nom de domaine (environ dix euros par an) et l'hébergement sont enregistrés à votre nom. À la livraison, je vous transmets tous les accès : vous n'êtes jamais dépendant de moi.",
  },
  {
    q: "Comment sont fixés les prix ?",
    a: "Chaque formule a un prix fixe, annoncé avant de commencer. Le simulateur vous donne une estimation en 30 secondes ; le prix final est confirmé pendant l'échange de 15 minutes et ne change pas en cours de route, sauf si vous ajoutez des pages ou des fonctions.",
  },
  {
    q: "Puis-je demander des modifications après livraison ?",
    a: "Oui. Avec le suivi mensuel (39 €/mois), deux petites modifications par mois sont incluses, ainsi que les mises à jour et les vérifications (6 mois minimum, puis préavis de 30 jours). Sans suivi, chaque modification est chiffrée à l'avance, au cas par cas.",
  },
  {
    q: "Je n'ai pas de photos ni de textes. C'est un problème ?",
    a: "Non. Des photos prises au téléphone suffisent souvent, et je vous guide pour les choisir. Pour les textes, je vous pose quelques questions simples, ou je les rédige pour vous en option.",
  },
  {
    q: "Mon site sera-t-il visible sur Google et sur téléphone ?",
    a: "Chaque site est conçu d'abord pour le téléphone, là où vos clients vous cherchent. La formule Signature inclut les bases du référencement : titres, descriptions, vitesse de chargement et mots-clés locaux comme « coach à Bruxelles ».",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div className="faq__intro">
          <p className="section__eyebrow" data-reveal>
            FAQ
          </p>
          <h2 id="faq-title" className="section__title" data-reveal>
            Questions fréquentes
          </h2>
          <p data-reveal>
            Une autre question ? Écrivez-moi, je réponds personnellement.
          </p>
        </div>

        <div className="faq__list">
          {QUESTIONS.map((item) => (
            <details
              key={item.q}
              className="faq__item"
              data-reveal
              data-reveal-group="faq"
            >
              <summary className="faq__q">
                <span>{item.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </summary>
              <div className="faq__a">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
