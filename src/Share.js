import React, { useState } from "react";
import ShareModal from "./ShareModal";

function Share({ label, text, title }) {
  const [showModal, setShowModal] = useState(false);

  const canonical = document.querySelector("link[rel=canonical]");
  let url = canonical ? canonical.href : document.location.href;
  const shareDetails = { url, title, text };

  const handleSharing = async () => {
    if (navigator.share) {
      try {
        await navigator
          .share(shareDetails)
          .then(() =>
            console.log("Hooray! Your content was shared to tha world")
          );
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`);
      }
    } else {
      // fallback code
      setShowModal(true);
      console.log(
        "Web share is currently not supported on this browser. Please provide a callback"
      );
    }
  };
  return (
    <>
      <button className="sharer-button" onClick={handleSharing}>
        <span className="sharer-button-text">{label}</span>
      </button>

      <ShareModal
        handleClose={setShowModal}
        shareData={shareDetails}
        modalVisible={showModal}
      />
    </>
  );
}

export default Share;
