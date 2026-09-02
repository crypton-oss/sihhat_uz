import 'dart:convert';
import 'package:http/http.dart' as http;

class EskizService {
  static const String _baseUrl = 'https://notify.eskiz.uz/api';
  
  static const String _email = 'ozodbekusmonqulov7777@gmail.com';
  static const String _password = 'xEWT0J0P5WDpWrFpWZtasNz261yAtWRm8IIJmEmo';

  String? _token;

  Future<bool> login() async {
    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/auth/login'),
        body: {
          'email': _email,
          'password': _password,
        },
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        _token = data['data']['token'];
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  Future<bool> sendSmsCode({required String phoneNumber, required String code}) async {
    // KODNI KONSOLGA CHIQARISH (Siz uni ko'rishingiz uchun)
    print('-----------------------------------------');
    print('TASDIQLASH KODI: $code');
    print('-----------------------------------------');

    if (_token == null) {
      final loggedIn = await login();
      if (!loggedIn) return false;
    }

    final cleanPhone = phoneNumber.replaceAll(RegExp(r'[^0-9]'), '');

    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/message/sms/send'),
        headers: {
          'Authorization': 'Bearer $_token',
        },
        body: {
          'mobile_phone': cleanPhone,
          // MUHIM: Eskiz TEST rejimida FAQAT ushbu matnni qabul qiladi.
          // Kodni SMS ichida yuborish uchun Eskiz.uz akkauntingizni faollashtirishingiz kerak.
          'message': 'Bu Eskiz dan test', 
          'from': '4546',
        },
      );

      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }
}
