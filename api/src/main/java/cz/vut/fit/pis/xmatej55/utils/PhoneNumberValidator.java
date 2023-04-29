package cz.vut.fit.pis.xmatej55.utils;

import com.google.i18n.phonenumbers.NumberParseException;
import com.google.i18n.phonenumbers.PhoneNumberUtil;
import com.google.i18n.phonenumbers.Phonenumber;

public class PhoneNumberValidator {

    private static PhoneNumberUtil phoneUtil = PhoneNumberUtil.getInstance();

    public static boolean isValidPhoneNumber(String phoneNumber) {
        try {
            Phonenumber.PhoneNumber parsedPhoneNumber = phoneUtil.parse(phoneNumber, null);
            return phoneUtil.isValidNumber(parsedPhoneNumber);
        } catch (NumberParseException e) {
            System.err.println("Error parsing phone number: " + e);
            return false;
        }
    }
}