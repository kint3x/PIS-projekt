package cz.vut.fit.pis.xmatej55.entities;

public class ErrorDTO {

  private String message;

  public ErrorDTO() {

  }

  public ErrorDTO(String message) {
    this.message = message;
  }

  public String getMessage() {
    return this.message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
