// material-ui
import logo from '../../tts-logo.png'
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
    
     *
     */
    <img src={logo} alt="TTS" width="120" />
    // <>
    //   <svg width="118" height="35" viewBox="0 0 118 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    //   <text x="15" y="20" fill={theme.palette.primary.dark}>TTS</text>
    //   </svg>
    // </>
  );
};

export default Logo;
