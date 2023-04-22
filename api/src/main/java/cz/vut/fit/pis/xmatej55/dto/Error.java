package cz.vut.fit.pis.xmatej55.dto;

public class Error {

  private String message;

  public Error() {

  }

  public Error(String message) {
    this.message = message;
  }

  public String getMessage() {
    return this.message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
