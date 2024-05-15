import React, { useState, useEffect } from "react";

const Transliterate = ({ text }) => {
  const [hindiText, setHindiText] = useState("");

  useEffect(() => {
    const transliterateText = async () => {
      if (!text) {
        setHindiText("");
        return;
      }

      try {
        // Call to a transliteration API (replace the URL with your actual transliteration API endpoint)
        const response = await fetch(
          `https://inputtools.google.com/request?text=${text}&itc=hi-t-i0-und&num=1`
        );
        const data = await response.json();

        // Update the Hindi text
        if (
          data &&
          data[1] &&
          data[1][0] &&
          data[1][0][1] &&
          data[1][0][1][0]
        ) {
          setHindiText(data[1][0][1][0]);
        }
      } catch (error) {
        console.error("Error fetching transliteration:", error);
        setHindiText("");
      }
    };

    transliterateText();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return <>{hindiText}</>;
};

export default Transliterate;
