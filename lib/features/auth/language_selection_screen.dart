import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:sihhat_uz/core/localization/app_strings.dart';
import 'package:sihhat_uz/features/auth/phone_input_screen.dart';

class LanguageSelectionScreen extends StatefulWidget {
  const LanguageSelectionScreen({super.key});

  @override
  State<LanguageSelectionScreen> createState() => _LanguageSelectionScreenState();
}

class _LanguageSelectionScreenState extends State<LanguageSelectionScreen> {
  String _selectedLocale = 'uz';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF4F4F5),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 40),
              const Text(
                'Language',
                style: TextStyle(
                  fontFamily: 'Satoshi',
                  fontSize: 32,
                  fontWeight: FontWeight.w800,
                  color: Colors.black,
                  letterSpacing: -1,
                ),
              ).animate().fade().slideX(begin: -0.1),
              const SizedBox(height: 60),
              
              _buildLanguageItem('O\'zbekcha', '🇺🇿', 'uz'),
              const SizedBox(height: 12),
              _buildLanguageItem('Русский', '🇷🇺', 'ru'),
              const SizedBox(height: 12),
              _buildLanguageItem('English', '🇺🇸', 'en'),
              
              const Spacer(),
              
              Center(
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 40), // Pasroq tushirildi
                  child: SizedBox(
                    width: 200,
                    height: 48,
                    child: ElevatedButton(
                      onPressed: () {
                        AppStrings.currentLocale = _selectedLocale;
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => const PhoneInputScreen()),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF10B981),
                        foregroundColor: Colors.white,
                        elevation: 0,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            AppStrings.get('continue'),
                            style: const TextStyle(
                              fontFamily: 'Satoshi',
                              fontSize: 15,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          const SizedBox(width: 8),
                          const Icon(LucideIcons.arrow_right, size: 18),
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

  Widget _buildLanguageItem(String title, String flag, String locale) {
    bool isSelected = _selectedLocale == locale;
    
    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedLocale = locale;
          AppStrings.currentLocale = locale;
        });
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        width: double.infinity,
        height: 56, // 64 dan 56 ga (kichraytirildi)
        padding: const EdgeInsets.symmetric(horizontal: 16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(28),
          border: Border.all(
            color: isSelected ? const Color(0xFF10B981).withOpacity(0.3) : Colors.transparent,
            width: 1.5,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.02),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 34,
              height: 34,
              decoration: const BoxDecoration(
                color: Color(0xFFF4F4F5),
                shape: BoxShape.circle,
              ),
              child: Center(
                child: Text(flag, style: const TextStyle(fontSize: 18)),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                title,
                style: const TextStyle(
                  fontFamily: 'Satoshi',
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: Colors.black87,
                ),
              ),
            ),
            Container(
              width: 20,
              height: 20,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: isSelected ? const Color(0xFFBEF264) : Colors.transparent,
                border: Border.all(
                  color: isSelected ? const Color(0xFFBEF264) : Colors.black12,
                  width: 1.5,
                ),
              ),
              child: isSelected 
                  ? const Icon(Icons.check, size: 12, color: Colors.black)
                  : null,
            ),
          ],
        ),
      ),
    ).animate().fade(delay: 200.ms).slideY(begin: 0.1, end: 0);
  }
}
