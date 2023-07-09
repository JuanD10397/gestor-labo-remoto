import React, { useState, useEffect } from "react";

// prop es string con formato: Sun Jun 18 2023 23:00:00 GMT-0500 (hora estándar de Perú)

function useDateFormat(schedule) {
  let date = schedule.toString().substring(0, 21);

  // Sat Jun 17 2023 13:00
  let dayName = date.substring(0, 3);
  let month = date.substring(4, 7);
  let day = date.substring(8, 10);
  let year = date.substring(11, 15);
  let hour = date.substring(16);

  switch (dayName) {
    case "Mon":
      dayName = "Lunes";
      break;
    case "Tue":
      dayName = "Martes";
      break;
    case "Wed":
      dayName = "Miércoles";
      break;
    case "Thu":
      dayName = "Jueves";
      break;
    case "Fri":
      dayName = "Viernes";
      break;
    case "Sat":
      dayName = "Sábado";
      break;
    case "Sun":
      dayName = "Domingo";
      break;
    default:
      dayName = "";
  }

  switch (month) {
    case "Jan":
      month = "Enero";
      break;
    case "Feb":
      month = "Febrero";
      break;
    case "Mar":
      month = "Marzo";
      break;
    case "Apr":
      month = "Abril";
      break;
    case "May":
      month = "Mayo";
      break;
    case "Jun":
      month = "Junio";
      break;
    case "Jul":
      month = "Julio";
      break;
    case "Aug":
      month = "Agosto";
      break;
    case "Sep":
      month = "Septiembre";
      break;
    case "Oct":
      month = "Octubre";
      break;
    case "Nov":
      month = "Noviembre";
      break;
    case "Dec":
      month = "Diciembre";
      break;
    default:
      month = "";
  }

  return dayName + " " + day + " " + month + " " + year + " " + hour;
}

export { useDateFormat };
