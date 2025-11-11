// YearService — responsabilidad única: obtener el año actual
export default class YearService {
  getYear() {
    return new Date().getFullYear();
  }
}
