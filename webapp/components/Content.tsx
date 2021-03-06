import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type VideoProps = {
  url: string;
};

export default function Video({ url }: VideoProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      Page src: {url}
      <iframe
        className={classes.iframe}
        frameBorder="0"
        allowFullScreen
        loading="lazy"
        width="420" height="345" src={url}>
      </iframe>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    // overflow: 'hidden',
    /* 16:9 aspect ratio */
    position: 'relative',
  },
  iframe: {
    border: '0',
    height: '100%',
    left: '0',
    position: 'relative',
    top: '0',
    width: '100%',
  },
}));