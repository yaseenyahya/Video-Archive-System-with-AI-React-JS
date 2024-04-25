import React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  highlight: {
    backgroundColor: 'yellow', // Customize the background color
    fontWeight: 'bold', // Customize the font weight
  },

}));

const HighlightedTextTypography = (props) => {
  const classes = useStyles();

  // Function to wrap the highlighted word with <span> tags
  const highlightText = (text, highlightWord) => {
    const lowercasedText = text.toLowerCase();
    const lowercasedHighlightWord = highlightWord.toLowerCase();
    const startIndex = lowercasedText.indexOf(lowercasedHighlightWord);

    if (startIndex !== -1) {
      const endIndex = startIndex + lowercasedHighlightWord.length;
      const beforeHighlight = text.substring(0, startIndex);
      const highlighted = text.substring(startIndex, endIndex);
      const afterHighlight = text.substring(endIndex);

      return (
        <span>
          {beforeHighlight}
          <span className={classes.highlight}>{highlighted}</span>
          {afterHighlight}
        </span>
      );
    }

    return text;
  };

 
  return (
    <Typography {...props}>
{
      highlightText(props.text, props.highlightWord)
      }
    </Typography>
  );
};

const ConditionalHighlightedTextTypography = ({ text, highlightWord }) => {
  // Check if highlightWord is null, and render the component conditionally
  if (highlightWord === null) {
    return <Typography>{text}</Typography>;
  }

  return (
    <HighlightedTextTypography
      text={text}
      highlightWord={highlightWord}
     
    />
  );
};

export default ConditionalHighlightedTextTypography;
