package cz.vut.fit.pis.xmatej55.dto;

public class ClientProductDTO {
  private Long clientId;
  private Long employeeId;

  public ClientProductDTO () {

  }

  public Long getClientId() {
    return clientId;
  }

  public void setClientId(Long id) {
    this.clientId = id;
  }

  public Long getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(Long id) {
    this.employeeId = id;
  }
}
