import React, { useState, useEffect } from "react";
import { X, CreditCard, Check, Loader2, AlertCircle } from "lucide-react";
import './don.css';

const CreditCardBrandIcon = ({ brand }) => {
  return (
    <div className={`card-brand-icon ${brand}`}>
      {brand === 'visa' && (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1434CB">
          <path d="M21.4789 15.5837V15.4637H21.4389L21.3589 15.6237L21.2789 15.4637H21.2389V15.5837H21.2689V15.5037L21.3389 15.6437H21.3789L21.4489 15.5037V15.5837H21.4789ZM21.0489 15.5837V15.4937H21.1289V15.4637H20.9389V15.4937H21.0189V15.5837H21.0489Z" />
          <path d="M9.197 9.197C9.197 11.697 11.697 14.197 14.197 14.197C16.697 14.197 19.197 11.697 19.197 9.197C19.197 6.697 16.697 4.197 14.197 4.197C11.697 4.197 9.197 6.697 9.197 9.197Z" />
        </svg>
      )}
      {brand === 'mastercard' && (
        <svg className="w-8 h-8" viewBox="0 0 24 24">
          <circle cx="8" cy="12" r="6" fill="#EB001B" />
          <circle cx="16" cy="12" r="6" fill="#F79E1B" />
        </svg>
      )}
      {brand === 'amex' && (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#2E77BC">
          <path d="M22 4H2C1.447 4 1 4.447 1 5V19C1 19.553 1.447 20 2 20H22C22.553 20 23 19.553 23 19V5C23 4.447 22.553 4 22 4Z" />
        </svg>
      )}
    </div>
  );
};

const DonationPage = () => {
  const [donationType, setDonationType] = useState("one-time");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [cause, setCause] = useState("");
  const [comment, setComment] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardBrand, setCardBrand] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [formError, setFormError] = useState("");

  const predefinedAmounts = [20, 50, 100, 200, 500];

  const causes = {
    education: {
      title: "Support Education",
      description: "Help provide quality education to children in need",
      image: "/api/placeholder/400/300",
    },
    CFI: {
      title: "CFI Program",
      description: "Provide nutritious meals to underprivileged children",
      image: "/api/placeholder/400/300",
    },
    palemier: {
      title: "École Palmier",
      description: "Support our local school development program",
      image: "/api/placeholder/400/300",
    },
  };

  useEffect(() => {
    const detectCardBrand = (number) => {
      const cleanNumber = number.replace(/\D/g, '');
      if (cleanNumber.startsWith('4')) {
        return 'visa';
      } else if (/^5[1-5]/.test(cleanNumber)) {
        return 'mastercard';
      } else if (/^3[47]/.test(cleanNumber)) {
        return 'amex';
      }
      return '';
    };

    setCardBrand(detectCardBrand(cardNumber));
  }, [cardNumber]);

  const handleAmountChange = (value) => {
    setFormError(""); // Clear any previous errors
    if (typeof value === "number") {
      setAmount(value);
      setCustomAmount("");
    } else {
      setAmount("custom");
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    if (formattedValue.length <= 19) {
      setCardNumber(formattedValue);
    }
  };

  const handleConfirmDonation = () => {
    setShowDetails(false);
    setShowPayment(true);
  };

  const handleNextClick = () => {
    setFormError("");

    if (!amount && !customAmount) {
      setFormError("Please select or enter a donation amount");
      return;
    }

    if (amount === "custom" && (!customAmount || isNaN(customAmount) || parseFloat(customAmount) <= 0)) {
      setFormError("Please enter a valid donation amount");
      return;
    }

    if (!cause) {
      setFormError("Please select a cause");
      return;
    }

    setShowDetails(true);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentError("");

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (Math.random() > 0.5) {
        throw new Error("Payment failed. Please try again.");
      }
      setPaymentSuccess(true);
      setTimeout(() => {
        setShowPayment(false);
        setPaymentSuccess(false);
        setCardNumber("");
        setExpiryDate("");
        setCvv("");
      }, 2000);
    } catch (error) {
      setPaymentError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="donation-page">
      <div className="header">
        <h1 className="animate-fade-in">Faire un Don</h1>
        <p className="animate-slide-up">Ensemble, nous pouvons faire la différence dans la vie des enfants</p>
      </div>

      <div className="donation-container animate-fade-in">
        <div className="donation-form">
          <div className="form-header">Choisissez le montant</div>

          <div className="progress-dots">
            <div className={`dot ${donationType === "one-time" ? "active" : ""}`}></div>
            <div className={`dot ${donationType === "monthly" ? "active" : ""}`}></div>
            <div className="arrow">→</div>
          </div>

          <div className="donation-type animate-slide-up">
            <button
              className={`type-button ${donationType === "one-time" ? "active" : ""}`}
              onClick={() => setDonationType("one-time")}
            >
              One-time
            </button>
            <button
              className={`type-button ${donationType === "monthly" ? "active" : ""}`}
              onClick={() => setDonationType("monthly")}
            >
              Mensuelle
            </button>
          </div>

          <div className="amount-grid animate-fade-in">
            {predefinedAmounts.map((value, index) => (
              <button
                key={value}
                className={`amount-button ${amount === value ? "active" : ""}`}
                onClick={() => handleAmountChange(value)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                MAD {value}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="MAD Montant personnalisé"
            className="custom-amount animate-slide-up"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmount("custom");
            }}
          />

          <select
            className="cause-select animate-slide-up"
            value={cause}
            onChange={(e) => {
              setCause(e.target.value);
              setFormError("");
            }}
          >
            <option value="">Choisissez votre cause</option>
            <option value="education">Education</option>
            <option value="CFI">CFI</option>
            <option value="palemier">Ecole Palmier</option>
          </select>

          <div className="comment-section animate-fade-in">
            <input
              type="checkbox"
              id="comment"
              checked={comment}
              onChange={(e) => setComment(e.checked)}
            />
            <label htmlFor="comment">Écrivez-nous un commentaire</label>
          </div>

          {formError && (
            <div className="error-message animate-shake">
              <AlertCircle size={20} />
              <span>{formError}</span>
            </div>
          )}

          <button 
            className="next-button animate-bounce-in"
            onClick={handleNextClick}
          >
            Next
            <span className="arrow">→</span>
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      <div className={`modal-overlay ${showPayment ? "active" : ""}`}>
        <div className="payment-card">
          <button className="close-button" onClick={() => setShowPayment(false)}>
            <X size={24} />
          </button>

          {paymentSuccess ? (
            <div className="success-message animate-success">
              <div className="success-icon">
                <Check size={48} className="text-green-500" />
              </div>
              <h2>Payment Successful!</h2>
              <p>Thank you for your donation.</p>
            </div>
          ) : (
            <>
              <div className="payment-header">
                <h2>Payment Details</h2>
                <p className="payment-amount">
                  MAD {amount === "custom" ? customAmount : amount}
                </p>
              </div>

              <div className="payment-form">
                <div className="form-group">
                  <label>Card Information</label>
                  <div className="card-input-wrapper">
                    {cardBrand ? (
                      <CreditCardBrandIcon brand={cardBrand} />
                    ) : (
                      <CreditCard className="card-icon" size={20} />
                    )}
                    <input
                      type="text"
                      placeholder="2555 **** **** 7812"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="card-number-input"
                      maxLength="19"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => {
                        if (e.target.value.length <= 5) {
                          setExpiryDate(e.target.value.replace(/[^0-9/]/g, ""));
                        }
                      }}
                      className="expiry-input"
                      maxLength="5"
                    />
                  </div>

                  <div className="form-group half">
                    <label>CVV</label>
                    <input
                      type="password"
                      placeholder="***"
                      value={cvv}
                      onChange={(e) => {
                        if (e.target.value.length <= 3) {
                          setCvv(e.target.value.replace(/[^0-9]/g, ""));
                        }
                      }}
                      className="cvv-input"
                      maxLength="3"
                    />
                  </div>
                </div>

                {paymentError && (
                  <div className="error-message animate-shake">
                    <AlertCircle size={20} />
                    <span>{paymentError}</span>
                  </div>
                )}

                <button
                  className={`pay-now-button ${isProcessing ? 'processing' : ''}`}
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="processing-content">
                      <Loader2 className="animate-spin" size={20} />
                      Processing...
                    </span>
                  ) : (
                    'Pay Now'
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Details Modal */}
      <div className={`modal-overlay ${showDetails ? "active" : ""}`} onClick={() => setShowDetails(false)}>
        <div className="donation-details-card" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={() => setShowDetails(false)}>
            <X size={24} />
          </button>

          <img
            src={cause && causes[cause]?.image}
            alt="Donation cause"
            className="donation-image"
          />

          <h2 className="donation-details-title">
            {cause && causes[cause]?.title}
          </h2>

          <div className="donation-info-row">
            <span className="donation-info-label">Type de don</span>
            <span className="donation-info-value">
              {donationType === "one-time" ? "Unique" : "Mensuel"}
            </span>
          </div>

          <div className="donation-info-row">
            <span className="donation-info-label">Montant</span>
            <span className="donation-info-value">
              MAD {amount === "custom" ? customAmount : amount}
            </span>
          </div>

          <p className="donation-description">
            {cause && causes[cause]?.description}
          </p>

          <button className="confirm-button" onClick={handleConfirmDonation}>
            Confirmer le don
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;