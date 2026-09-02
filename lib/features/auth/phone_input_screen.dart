import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:sihhat_uz/features/auth/otp_verification_screen.dart';

class PhoneInputScreen extends StatefulWidget {
  const PhoneInputScreen({super.key});

  @override
  State<PhoneInputScreen> createState() => _PhoneInputScreenState();
}

class _PhoneInputScreenState extends State<PhoneInputScreen> {
  final TextEditingController _phoneController = TextEditingController();
  bool _isButtonActive = false;

  final maskFormatter = MaskTextInputFormatter(
    mask: '##-###-##-##',
    filter: {"#": RegExp(r'[0-9]')},
    type: MaskAutoCompletionType.lazy,
  );

  @override
  void initState() {
    super.initState();
    _phoneController.addListener(() {
      setState(() {
        String text = maskFormatter.getUnmaskedText();
        _isButtonActive = text.length >= 8; 
      });
    });
  }

  @override
  void dispose() {
    _phoneController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        automaticallyImplyLeading: false,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 10),
              const Text(
                'Telefon raqamingizni kiriting',
                style: TextStyle(
                  fontFamily: 'Satoshi',
                  fontSize: 22,
                  fontWeight: FontWeight.w700,
                  color: Colors.black,
                  letterSpacing: -0.5,
                ),
              ).animate().fade(duration: 400.ms).slideX(begin: -0.05),
              const SizedBox(height: 8),
              Text(
                'Hisobingizni himoya qilish uchun raqamingiz kerak.',
                style: TextStyle(
                  fontFamily: 'Satoshi',
                  fontSize: 14,
                  color: Colors.black.withOpacity(0.4),
                ),
              ).animate().fade(delay: 150.ms, duration: 400.ms),
              const SizedBox(height: 32),
              
              Container(
                height: 44,
                decoration: BoxDecoration(
                  color: const Color(0xFFF8F8F9),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(
                    color: Colors.black.withOpacity(0.06),
                    width: 0.8,
                  ),
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    const Padding(
                      padding: EdgeInsets.only(left: 16, right: 8),
                      child: Text(
                        '+998',
                        style: TextStyle(
                          fontFamily: 'Satoshi',
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                          color: Colors.black,
                        ),
                      ),
                    ),
                    Expanded(
                      child: TextField(
                        controller: _phoneController,
                        inputFormatters: [maskFormatter],
                        keyboardType: TextInputType.number,
                        autofocus: true,
                        textAlignVertical: TextAlignVertical.center,
                        style: const TextStyle(
                          fontFamily: 'Satoshi',
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                          letterSpacing: 1.0,
                          color: Colors.black,
                        ),
                        decoration: const InputDecoration(
                          border: InputBorder.none,
                          isDense: true,
                          contentPadding: EdgeInsets.zero,
                          hintText: '00-000-00-00',
                          hintStyle: TextStyle(color: Colors.black26),
                        ),
                      ),
                    ),
                  ],
                ),
              ).animate().fade(delay: 300.ms, duration: 400.ms).slideY(begin: 0.05),
              
              const Spacer(),
              
              Center(
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 24),
                  child: SizedBox(
                    width: 200,
                    height: 46,
                    child: ElevatedButton(
                      onPressed: _isButtonActive ? () {
                        final phone = '+998${maskFormatter.getUnmaskedText()}';
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => OtpVerificationScreen(phoneNumber: phone),
                          ),
                        );
                      } : null,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: _isButtonActive 
                            ? const Color(0xFF10B981) 
                            : const Color(0xFFF1F1F2),
                        foregroundColor: Colors.white,
                        elevation: 0,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12), // Sal qirraroq (Sharper)
                        ),
                        disabledBackgroundColor: const Color(0xFFF1F1F2),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Davom etish',
                            style: TextStyle(
                              fontFamily: 'Satoshi',
                              fontSize: 14,
                              fontWeight: FontWeight.w700,
                              color: _isButtonActive ? Colors.white : Colors.black26,
                            ),
                          ),
                          const SizedBox(width: 8),
                          Icon(
                            LucideIcons.arrow_right,
                            size: 16,
                            color: _isButtonActive ? Colors.white : Colors.black26,
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
