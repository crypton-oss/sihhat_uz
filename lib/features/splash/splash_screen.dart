import 'dart:async';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:sihhat_uz/features/auth/phone_input_screen.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const _SplashScreenContent();
  }
}

class _SplashScreenContent extends StatefulWidget {
  const _SplashScreenContent();

  @override
  State<_SplashScreenContent> createState() => _SplashScreenContentState();
}

class _SplashScreenContentState extends State<_SplashScreenContent> {
  @override
  void initState() {
    super.initState();
    _startApp();
  }

  Future<void> _startApp() async {
    // 1. Splash biroz turishi kerak
    await Future.delayed(const Duration(seconds: 2));

    // 2. Ruxsatlarni navbatma-navbat so'rash
    await _forceRequestAll();

    // 3. O'tish
    if (mounted) {
      _navigateToHome();
    }
  }

  Future<void> _forceRequestAll() async {
    // Har bir ruxsat uchun alohida request chaqiramiz
    await Permission.phone.request();
    await Permission.location.request();
    await Permission.notification.request();
    await Permission.camera.request();
    
    // Galereya (Android 13+ va pastdagilar)
    await Permission.photos.request();
    await Permission.storage.request();
  }

  void _navigateToHome() {
    Navigator.pushReplacement(
      context,
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) => const PhoneInputScreen(),
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return FadeTransition(opacity: animation, child: child);
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Ilovaga Xush kelibsiz',
              style: TextStyle(
                fontFamily: 'Satoshi',
                fontSize: 28,
                fontWeight: FontWeight.w700,
                color: Colors.black,
              ),
            ).animate().fade().slideY(begin: 0.2),
            const SizedBox(height: 40),
            const UiverseSpinner(size: 28),
          ],
        ),
      ),
    );
  }
}

// ... UiverseSpinner kodini o'zgartirmasdan qoldirdim ...
class UiverseSpinner extends StatefulWidget {
  final double size;
  const UiverseSpinner({super.key, this.size = 28});

  @override
  State<UiverseSpinner> createState() => _UiverseSpinnerState();
}

class _UiverseSpinnerState extends State<UiverseSpinner> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 1))..repeat();
  }
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return CustomPaint(
          size: Size(widget.size, widget.size),
          painter: _SpinnerPainter(animationValue: _controller.value),
        );
      },
    );
  }
}

class _SpinnerPainter extends CustomPainter {
  final double animationValue;
  _SpinnerPainter({required this.animationValue});
  @override
  void paint(Canvas canvas, Size size) {
    final double radius = size.width / 2;
    final Paint paint = Paint()..style = PaintingStyle.fill;
    final double bladeWidth = size.width * 0.074;
    final double bladeHeight = size.width * 0.2777;
    final double bladeRadius = size.width * 0.0555;
    canvas.save();
    canvas.translate(radius, radius);
    for (int i = 0; i < 12; i++) {
      double progress = (animationValue - (i * 0.083)) % 1.0;
      if (progress < 0) progress += 1.0;
      final double opacity = 1.0 - progress;
      paint.color = const Color(0xFF69717D).withOpacity(opacity);
      final Rect rect = Rect.fromLTWH(-bladeWidth / 2, radius * 0.45, bladeWidth, bladeHeight);
      canvas.drawRRect(RRect.fromRectAndRadius(rect, Radius.circular(bladeRadius)), paint);
      canvas.rotate(30 * 0.0174533);
    }
    canvas.restore();
  }
  @override
  bool shouldRepaint(covariant _SpinnerPainter oldDelegate) => oldDelegate.animationValue != animationValue;
}
