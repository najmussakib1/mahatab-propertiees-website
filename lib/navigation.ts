interface ClickEventLike {
  preventDefault(): void;
}

export function navigateTo(hash: string): void {
  window.dispatchEvent(new CustomEvent("mpl-navigate", { detail: hash }));
}

export function handleNavClick(e: ClickEventLike, hash: string): void {
  e.preventDefault();
  navigateTo(hash);
}

/**
 * Route-aware section navigation. When already on the home single-page app it
 * fires the in-app navigation event; from any other route (e.g. /projects) it
 * travels back to the home route with the hash so the app can land on the
 * right section after mounting.
 */
export function navigateHomeTo(hash: string): void {
  if (window.location.pathname === "/" || window.location.pathname === "") {
    navigateTo(hash);
    return;
  }
  window.location.assign(hash === "#home" ? "/" : `/${hash}`);
}