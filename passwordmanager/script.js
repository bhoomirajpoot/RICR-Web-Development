function AddData(){
  const site=document.getElementById("SiteName").ariaValueMax.trim();
    const UN=document.getElementById("UserName").ariaValueMax.trim();
      const PS=document.getElementById("Password").ariaValueMax.trim();

      const DataPacket={
        webSite:site,
        UserName:UN,
        Password:PS,
      };

      console.log(DataPacket);

      localStorage.setItem()
}
