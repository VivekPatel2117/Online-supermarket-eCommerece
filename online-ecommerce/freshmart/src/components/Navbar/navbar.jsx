import React from "react";
import style from "./navbar.module.css";

export default function Navbar() {
  return (
    <div className={style.navbar}>
      <div className={style.branding}>
        <h1>Supermarket</h1>
      </div>
      <div className={style.searchBar}>
        <div className={style.input}>
          <input
            type="search"
            placeholder=" Search  'apple'"
            name="search"
            id="search"
          />
        </div>
        <div className={style.icon}>
          <p>Search</p>
        </div>
      </div>
      <div className={style.actions}>
        <i className="material-icons" style={{ color: "white", fontSize: "40px" }}>
          shopping_cart
        </i>
        <i className="material-icons" style={{ color: "white", fontSize: "40px" }}>
          favorite
        </i>
      </div>
    </div>
  );
}
