import { useEffect, useState } from "react";

export default function GDPRConsent() {
  const [visible, setVisible] = useState(false); // Show consent banner
  const [accepted, setAccepted] = useState(null); // true/false/null
  const [showIcon, setShowIcon] = useState(false); // Show cookie icon

  useEffect(() => {
    const consent = localStorage.getItem("gdprConsent");
    if (consent === "true" || consent === "false") {
      setAccepted(consent === "true");
      setShowIcon(true); // show cookie icon if previously chosen
    } else {
      setVisible(true); // no previous choice
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("gdprConsent", "true");
    setAccepted(true);
    setVisible(false);
    setShowIcon(true);
  };

  const handleReject = () => {
    localStorage.setItem("gdprConsent", "false");
    setAccepted(false);
    setVisible(false);
    setShowIcon(true);
  };

  const handleIconClick = () => {
    // Reopen consent banner
    setVisible(true);
    setShowIcon(false);
  };

  return (
    <>
      {/* Cookie Banner */}
      {visible && (
        <div className="fixed bottom-6 right-6 max-w-xs p-4 rounded-lg bg-black text-white z-50 shadow-lg">
          <p className="text-sm mb-3 text-center">
            We use cookies to improve your experience.{" "}
            <a href="/privacy-policy" className="underline text-red-400">
              See our Privacy Policy
            </a>
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleReject}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 text-sm"
            >
              Accept
            </button>
          </div>
        </div>
      )}

      {/* Cookie Icon in Red Circle (smaller size) */}
      {showIcon && !visible && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={handleIconClick}
            className="w-10 h-10 rounded-full bg-red-600 shadow-lg border border-white flex items-center justify-center hover:scale-105 transition cursor-pointer"
            title="Cookie Preferences"
          >
            <img
              src="/revisit.svg" // Use your existing cookie icon
              alt="Cookie Icon"
              className="w-6 h-6 object-contain"
            />
          </button>
        </div>
      )}
    </>
  );
}
