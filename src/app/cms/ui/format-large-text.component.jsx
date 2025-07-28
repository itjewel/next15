import { useState } from "react";

export const FormatLargeText = ({text}) => {
  const [showFullText, setShowFullText] = useState(false);

    const toggleText = () => {
        setShowFullText(!showFullText);
    };

    const modifiedText = () => {
        if (!showFullText) {
          return text?.substring(0, 43) + "...";
        }
        return text;
    };

    return (
        <div>
            {modifiedText()}
            <button 
            onClick={toggleText}
            className="fw-light"
            style={{ border: "none", background: "none", cursor: "pointer" }}
            >
                {showFullText ? 'See less' : 'See more'}
            </button>
        </div>
    );
  };