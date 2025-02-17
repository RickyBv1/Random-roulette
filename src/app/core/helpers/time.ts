export function howLongFromPastDate(futureDate: Date | string,short=false):string{
    let date: Date;
    if(typeof futureDate === "string"){
      date = new Date(futureDate)
    } else {
      date = futureDate
    }
    const seconds = Math.floor((date.getTime() - new Date().getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      if (interval < 2) return !short ? "In a year" : "1 and";
      return "In " + Math.floor(interval) + (!short ? " years" : " and");
    }
  
    interval = seconds / 2592000;
    if (interval > 1) {
      if (interval < 2) return !short ? "In a year" : "1 m";
      return "In " + Math.floor(interval) + (!short ? " months" : " m");
    }
  
    interval = seconds / 86400;
    if (interval > 1) {
      if (interval < 2) return !short ? "Morning" : "1 d";
      return "In " + Math.floor(interval) + (!short ? " days" : " d");
    }
  
    interval = seconds / 3600;
    if (interval > 1) {
      if (interval < 2) return !short ? "In an hour" : "1 h";
      return "In " + Math.floor(interval) + (!short ? " hours" : " h");
    }
  
    interval = seconds / 60;
    /*if (interval > 1) {
      if (interval < 2) return !short ? "Dentro de 1 minuto" : "1 m";
      return "Dentro de " + Math.floor(interval) + (!short ? " minutos" : " mm");
    }*/
  
    return (!short ? "Past" : "Past");
  }