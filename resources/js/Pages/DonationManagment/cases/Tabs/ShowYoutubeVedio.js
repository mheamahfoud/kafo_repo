import React from "react";
import PropTypes from "prop-types";
import './style.css';
export default function YoutubeEmbed({ src }) {
    return (

        <div className="video-responsive">
            <iframe
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
                title="video"
            />
        </div>
        
        );
}





