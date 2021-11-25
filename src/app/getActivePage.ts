const getActivePage = () => {
  const pathname = window.location.pathname;
  let activePage;
  if(pathname==='/articles'){
    activePage = 'articles';
  }
  else if(pathname==='/feeds'){
    activePage = 'feeds';
  }
  else{
    activePage = 'unknown';
  }
  return activePage;
}

export default getActivePage;
