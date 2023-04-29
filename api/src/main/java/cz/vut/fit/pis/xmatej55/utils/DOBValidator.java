package cz.vut.fit.pis.xmatej55.utils;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class DOBValidator {
    public static boolean isValidDateOfBirth(Date dob) {
        if (dob == null) {
            return false;
        }

        LocalDate dateOfBirth = dob.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate currentDate = LocalDate.now();

        return !dateOfBirth.isAfter(currentDate);
    }
}
