import 'dart:async';
import 'package:flutter/material.dart';
import 'package:pinput/pinput.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:sihhat_uz/features/auth/register_screen.dart';

class OtpVerificationScreen extends StatefulWidget {
  final String phoneNumber;
  const OtpVerificationScreen({super.key, required this.phoneNumber});

  @override
  State<OtpVerificationScreen> createState() => _OtpVerificationScreenState();
}

class _OtpVerificationScreenState extends State<OtpVerificationScreen> {
  int _timerSeconds = 60;
  Timer? _timer;
  final TextEditingController _pinController = TextEditingController();
  bool _isButtonActive = false;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    _timer?.cancel();
    setState(() => _timerSeconds = 60);
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_timerSeconds > 0) {
        setState(() => _timerSeconds--);
      } else {
        _timer?.cancel();
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _pinController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final defaultPinTheme = PinTheme(
      width: 48,
      height: 48,
      textStyle: const TextStyle(
        fontSize: 18,
        color: Colors.black,
        fontWeight: FontWeight.w700,
        fontFamily: 'Satoshi',
      ),
      decoration: BoxDecoration(
        color: const Color(0xFFF8F8F9),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.black.withOpacity(0.05)),
      ),
    );

    final focusedPinTheme = defaultPinTheme.copyDecorationWith(
      border: Border.all(color: const Color(0xFF10B981), width: 1.5),
      color: Colors.white,
    );

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(LucideIcons.chevron_left, color: Colors.black, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 10),
              const Text(
                '6 xonali kodni kiriting',
                style: TextStyle(
                  fontFamily: 'Satoshi',
                  fontSize: 22,
                  fontWeight: FontWeight.w700,
                  color: Colors.black,
                  letterSpacing: -0.5,
                ),
              ).animate().fade(duration: 400.ms).slideX(begin: -0.05),
              const SizedBox(height: 8),
              RichText(
                text: TextSpan(
                  style: TextStyle(
                    fontFamily: 'Satoshi',
                    fontSize: 14,
                    color: Colors.black.withOpacity(0.4),
                  ),
                  children: [
                    const TextSpan(text: 'Tasdiqlash kodi ushbu raqamga yuborildi: '),
                    TextSpan(
                      text: widget.phoneNumber,
                      style: const TextStyle(
                        color: Color(0xFF10B981),
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ).animate().fade(delay: 150.ms, duration: 400.ms),
              const SizedBox(height: 32),
              
              Center(
                child: Pinput(
                  length: 6,
                  controller: _pinController,
                  defaultPinTheme: defaultPinTheme,
                  focusedPinTheme: focusedPinTheme,
                  separatorBuilder: (index) {
                    if (index == 2) {
                      return Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 8),
                        child: Text(
                          '-',
                          style: TextStyle(
                            fontSize: 20,
                            color: Colors.black.withOpacity(0.2),
                          ),
                        ),
                      );
                    }
                    return const SizedBox(width: 8);
                  },
                  hapticFeedbackType: HapticFeedbackType.lightImpact,
                  onChanged: (pin) {
                    setState(() {
                      _isButtonActive = pin.length == 6;
                    });
                  },
                  // Avtomatik o'tib ketishni olib tashladik
                  onCompleted: (pin) {},
                ),
              ).animate().fade(delay: 300.ms).slideY(begin: 0.05),
              
              const SizedBox(height: 24),
              
              Center(
                child: Column(
                  children: [
                    Text(
                      _timerSeconds > 0 
                          ? 'Kodni qayta yuborish: ${_timerSeconds}s' 
                          : 'Kodni olmadingizmi? ',
                      style: TextStyle(
                        fontFamily: 'Satoshi',
                        fontSize: 13,
                        color: Colors.black.withOpacity(0.4),
                      ),
                    ),
                    if (_timerSeconds == 0)
                      TextButton(
                        onPressed: () => _startTimer(),
                        child: const Text(
                          'Kodni qayta yuborish',
                          style: TextStyle(
                            fontFamily: 'Satoshi',
                            color: Color(0xFF10B981),
                            fontWeight: FontWeight.w700,
                            fontSize: 13,
                          ),
                        ),
                      ),
                  ],
                ),
              ).animate().fade(delay: 450.ms),
              
              const Spacer(),
              
              Center(
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 24),
                  child: SizedBox(
                    width: 200,
                    height: 46,
                    child: ElevatedButton(
                      onPressed: _isButtonActive ? () => _verifyCode(_pinController.text) : null,
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
                          const Icon(LucideIcons.arrow_right, size: 16),
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

  void _verifyCode(String pin) {
    if (pin == '000000' || pin.length == 6) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => const RegisterScreen()),
      );
    }
  }
}
