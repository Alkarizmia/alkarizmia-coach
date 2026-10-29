import { motion } from "framer-motion";
import { useEffect, useId, useRef } from "react";
import {
  FORMULE_EXTRAS,
  FORMULES_UI,
  PAYMENT,
  formuleInterestMessage,
  mailtoLink,
  whatsappLink,
} from "../../site.config.js";
import { trackEvent } from "../../analytics.js";
import { FormuleIcon, IconBack, IconClose } from "./icons.jsx";
import BeforeAfter from "./BeforeAfter.jsx";
import DeviceShowcase from "./DeviceShowcase.jsx";

function formatRoi(formule) {
  const roi = formule.roi;
  if (!roi) return "";
  return roi.template
    .replace("{clientPrice}", String(roi.clientPrice))
    .replace("{period}", roi.period)
    .replace("{monthlyApprox}", String(roi.monthlyApprox))
    .replace("{payback}", roi.payback)
    .replace("{name}", formule.name);
}

function depositLine(formule, size) {
  const deposit = size?.deposit ?? formule.deposit;
  const balance = size?.balance ?? formule.balance;
  if (deposit == null || balance == null) return null;
  return FORMULES_UI.depositLine
    .replace("{deposit}", String(deposit))
    .replace("{balance}", String(balance));
}

/**
 * Panneau détail — shared layout (framer-motion).
 * Focus piégé, Échap / fond / × pour fermer, scroll page bloqué.
 */
export default function FormuleDetail({ formule, onClose }) {
  const titleId = useId();
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      const list = [...focusables].filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
      );
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const priceLabel = `${formule.pricePrefix || ""}${formule.price} €`;
  const primarySize = formule.sizes?.[0];
  const payDeposit = primarySize?.deposit ?? formule.deposit;
  const payBalance = primarySize?.balance ?? formule.balance;
  const interestMessage = formuleInterestMessage(formule);

  return (
    <div className="formule-detail-root">
      <motion.button
        type="button"
        className="formule-detail__backdrop"
        aria-label="Fermer le détail"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        className="formule-detail"
        layoutId={`formule-card-${formule.id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
      >
        <div className="formule-detail__chrome">
          <button
            type="button"
            className="formule-detail__back"
            onClick={onClose}
            ref={closeRef}
          >
            <IconBack />
            <span>Retour</span>
          </button>
          <button
            type="button"
            className="formule-detail__close"
            onClick={onClose}
            aria-label="Fermer"
          >
            <IconClose />
          </button>
        </div>

        <div className="formule-detail__scroll">
          <header className="formule-detail__header">
            <p className="formule-detail__eyebrow">{formule.pagesLabel}</p>
            <h3 id={titleId} className="formule-detail__title">
              {formule.name}
            </h3>
            <p className="formule-detail__price-row">
              <span className="formule-detail__price">{priceLabel}</span>
              <span className="formule-card__once">{FORMULES_UI.oncePill}</span>
            </p>
            {depositLine(formule, primarySize) && (
              <p className="formule-card__split">{depositLine(formule, primarySize)}</p>
            )}
            <p className="formule-detail__tagline">{formule.tagline}</p>
          </header>

          {formule.isRefonte ? (
            <BeforeAfter
              before={formule.beforeAfter.before}
              after={formule.beforeAfter.after}
            />
          ) : (
            <DeviceShowcase
              screens={formule.screens}
              showDesktop={formule.showDesktop}
            />
          )}

          <section className="formule-detail__block" aria-labelledby={`${formule.id}-recv`}>
            <h4 id={`${formule.id}-recv`} className="formule-detail__h">
              {FORMULES_UI.receivesTitle}
            </h4>
            <ul className="formule-detail__receives">
              {formule.receives.map((item) => (
                <li key={item.text}>
                  <FormuleIcon name={item.icon} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </section>

          {formule.isRefonte && formule.sizes && (
            <section className="formule-detail__block" aria-labelledby={`${formule.id}-sizes`}>
              <h4 id={`${formule.id}-sizes`} className="formule-detail__h">
                {FORMULES_UI.refonteSizesTitle}
              </h4>
              <div className="formule-detail__table" role="table">
                <div className="formule-detail__tr formule-detail__tr--head" role="row">
                  <span role="columnheader">Taille</span>
                  <span role="columnheader">Prix</span>
                  <span role="columnheader">Délai</span>
                </div>
                {formule.sizes.map((size) => (
                  <div className="formule-detail__tr" role="row" key={size.label}>
                    <span role="cell">{size.label}</span>
                    <span role="cell">{size.price} €</span>
                    <span role="cell">≈ {size.days} j</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="formule-detail__block formule-detail__roi" aria-labelledby={`${formule.id}-roi`}>
            <h4 id={`${formule.id}-roi`} className="formule-detail__h">
              {FORMULES_UI.concreteTitle}
            </h4>
            <p>{formatRoi(formule)}</p>
          </section>

          {(payDeposit != null || formule.sizes) && (
            <section className="formule-detail__block" aria-labelledby={`${formule.id}-pay`}>
              <h4 id={`${formule.id}-pay`} className="formule-detail__h">
                {FORMULES_UI.paymentTitle}
              </h4>
              <div className="formule-detail__bars">
                <div className="formule-detail__bar">
                  <div className="formule-detail__bar-fill formule-detail__bar-fill--40" />
                  <p>
                    <strong>{PAYMENT.depositPercent} %</strong>
                    {payDeposit != null && <> · {payDeposit} €</>}
                    <span> pour démarrer</span>
                  </p>
                </div>
                <div className="formule-detail__bar">
                  <div className="formule-detail__bar-fill formule-detail__bar-fill--60" />
                  <p>
                    <strong>{PAYMENT.balancePercent} %</strong>
                    {payBalance != null && <> · {payBalance} €</>}
                    <span> à la livraison</span>
                  </p>
                </div>
              </div>
              {formule.isRefonte && (
                <p className="formule-detail__pay-hint">
                  Montants indiqués pour la taille « {primarySize.label} » (
                  {primarySize.price} €). Les autres tailles suivent le même
                  découpage 40 / 60.
                </p>
              )}
              <p className="formule-detail__pay-note">{PAYMENT.balanceNote}</p>
            </section>
          )}

          <section className="formule-detail__block formule-detail__extras">
            <h4 className="formule-detail__h">{FORMULES_UI.extrasTitle}</h4>
            <p>
              {FORMULE_EXTRAS.map((extra, i) => (
                <span key={extra.id}>
                  {i > 0 && " · "}
                  {extra.label} +{extra.price} €
                </span>
              ))}
            </p>
          </section>

          <div className="formule-detail__actions">
            <a
              href={mailtoLink(
                `Échange 15 min — formule ${formule.name}`,
                interestMessage,
              )}
              className="btn btn--primary"
              onClick={() =>
                trackEvent("cta_click", {
                  location: `formule_${formule.id}`,
                  label: FORMULES_UI.primaryCta,
                  formule: formule.name,
                })
              }
            >
              {FORMULES_UI.primaryCta}
            </a>
            <a
              href={whatsappLink(interestMessage)}
              className="btn btn--secondary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("whatsapp_click", {
                  location: `formule_${formule.id}`,
                  formule: formule.name,
                })
              }
            >
              {FORMULES_UI.secondaryCta}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
