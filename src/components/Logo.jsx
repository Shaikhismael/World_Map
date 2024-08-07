import styles from "./Logo.module.css";
import Img from '../logo.png'
import { Link } from "react-router-dom";

function Logo() {
  return <Link to='/'>
  <img src={Img} alt="WorldWise logo" className={styles.logo} /></Link>;
}

export default Logo;
