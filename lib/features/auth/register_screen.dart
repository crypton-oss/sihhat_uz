import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:intl/intl.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:sihhat_uz/core/localization/app_strings.dart';
import 'package:sihhat_uz/features/dashboard/dashboard_screen.dart';

class RegisterScreen extends StatefulWidget {
  final String phoneNumber;
  const RegisterScreen({super.key, required this.phoneNumber});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  String? _selectedProvince;
  String? _selectedDistrict;
  DateTime? _selectedDate;
  bool _isLoading = false;

  final List<String> _provinces = ['Andijon viloyati', 'Buxoro viloyati', 'Farg\'ona viloyati', 'Jizzax viloyati', 'Xorazm viloyati', 'Namangan viloyati', 'Navoiy viloyati', 'Qashqadaryo viloyati', 'Samarqand viloyati', 'Sirdaryo viloyati', 'Surxondaryo viloyati', 'Toshkent viloyati', 'Qoraqalpog\'iston Respublikasi', 'Toshkent shahri'];
  final Map<String, List<String>> _districts = {"Andijon viloyati": ["Andijon tumani", "Asaka tumani", "Buloqboshi tumani", "Bo'ston tumani", "Izboskan tumani", "Jalaquduq tumani", "Marhamat tumani", "Oltinko'l tumani", "Paxtaobod tumani", "Shahrixon tumani", "Ulug'nor tumani", "Xo'jaobod tumani", "Qo'rg'ontepa tumani", "Xonobod tumani"], "Buxoro viloyati": ["Buxoro tumani", "Vobkent tumani", "Jondor tumani", "Kogon tumani", "Olot tumani", "Pesku tumani", "Qorako'l tumani", "Qoravulbozor tumani", "Romitan tumani", "Shofirkon tumani", "G'ijduvon tumani"], "Farg'ona viloyati": ["Beshariq tumani", "Buvayda tumani", "Dang'ara tumani", "Yozyovon tumani", "Quva tumani", "Qo'shtepa tumani", "Rishton tumani", "So'x tumani", "Toshloq tumani", "O'zbekiston tumani", "Farg'ona tumani", "Furqat tumani", "Oltiariq tumani", "Bag'dod tumani", "Marg'ilon tumani", "Qo'qon tumani", "Quvasoy tumani"], "Jizzax viloyati": ["Arnasoy tumani", "Baxmal tumani", "G'allaorol tumani", "Sharof Rashidov tumani", "Do'stlik tumani", "Zomin tumani", "Zarbdor tumani", "Zafarobod tumani", "Mirzacho'l tumani", "Paxtakor tumani", "Forish tumani", "Yangiobod tumani", "Jizzax tumani"], "Xorazm viloyati": ["Bog'ot tumani", "Gurlan tumani", "Qo'shko'pir tumani", "Tuproqqal'a tumani", "Xazorasp tumani", "Xonqa tumani", "Xiva tumani", "Shovot tumani", "Yangiariq tumani", "Yangibozor tumani", "Urganch tumani"], "Namangan viloyati": ["Kosonsoy tumani", "Mingbuloq tumani", "Namangan tumani", "Norin tumani", "Pop tumani", "To'raqo'rg'on tumani", "Uychi tumani", "Uchqo'rg'on tumani", "Chortoq tumani", "Chust tumani", "Yangiqo'rg'on tumani"], "Navoiy viloyati": ["Konimex tumani", "Karmana tumani", "Qiziltepa tumani", "Xatirchi tumani", "Navbahor tumani", "Nurota tumani", "Tomdi tumani", "Uchquduq tumani", "Navoiy tumani", "Zarafshon tumani"], "Qashqadaryo viloyati": ["G'uzor tumani", "Dehqonobod tumani", "Qamashi tumani", "Qarshi tumani", "Koson tumani", "Kasbi tumani", "Kitob tumani", "Mirishkor tumani", "Muborak tumani", "Nishon tumani", "Shahrisabz tumani", "Chiroqchi tumani", "Ko'kdala tumani", "Yakkabog' tumani"], "Samarqand viloyati": ["Bulung'ur tumani", "Jomboy tumani", "Ishtixon tumani", "Kattaqo'rg'on tumani", "Narpay tumani", "Nurobod tumani", "Oqdaryo tumani", "Paxtachi tumani", "Payariq tumani", "Pastdarg'om tumani", "Samarqand tumani", "Toyloq tumani", "Urgut tumani", "Qo'shrabot tumani"], "Sirdaryo viloyati": ["Oqoltin tumani", "Boyovut tumani", "Guliston tumani", "Xovos tumani", "Mirzaobod tumani", "Sayxunobod tumani", "Sardoba tumani", "Sirdaryo tumani", "Shirin tumani", "Yangiyer tumani"], "Surxondaryo viloyati": ["Angor tumani", "Bandixon tumani", "Denov tumani", "Jarqo'rg'on tumani", "Qiziriq tumani", "Qumqo'rg'on tumani", "Muzrabot tumani", "Sariosiyo tumani", "Termiz tumani", "Uzun tumani", "Sherobod tumani", "Sho'rchi tumani", "Oltinsoy tumani", "Boysun tumani"], "Toshkent viloyati": ["Oqqurg'on tumani", "Ohangaron tumani", "Bo'stonliq tumani", "Bo'ka tumani", "Zangiota tumani", "Qibray tumani", "Parkent tumani", "Pskent tumani", "Chinoz tumani", "Yuqorichirchiq tumani", "Yangiyo'l tumani", "O'rtachirchiq tumani", "Toshkent tumani", "Quyi Chirchiq tumani", "Chirchiq tumani", "Angren tumani", "Olmaliq tumani", "Bekobod tumani", "Nurafshon tumani"], "Qoraqalpog'iston Respublikasi": ["Amudaryo tumani", "Beruniy tumani", "Qorao'zak tumani", "Kegeyli tumani", "Qo'ng'irot tumani", "Qonliko'l tumani", "Mo'ynoq tumani", "Nukus tumani", "Taxiatosh tumani", "Taxtako'pir tumani", "To'rtko'l tumani", "Xo'jayli tumani", "Chimboy tumani", "Shumanay tumani", "Ellikqal'a tumani", "Bo'zatov tumani"], "Toshkent shahri": ["Bektemir tumani", "Mirobod tumani", "Mirzo Ulug'bek tumani", "Sergeli tumani", "Olmazor tumani", "Uchtepa tumani", "Chilonzor tumani", "Shayxontohur tumani", "Yunusobod tumani", "Yakkasaroy tumani", "Yashnobod tumani", "Yangihayot tumani"]};

  Future<void> _saveToSupabase() async {
    setState(() => _isLoading = true);
    try {
      final supabase = Supabase.instance.client;
      await supabase.from('users').upsert({
        'phone_number': widget.phoneNumber,
        'first_name': _firstNameController.text.trim(),
        'last_name': _lastNameController.text.trim(),
        'province': _selectedProvince,
        'district': _selectedDistrict,
        'birth_date': _selectedDate?.toIso8601String(),
        'created_at': DateTime.now().toIso8601String(),
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Ro\'yxatdan o\'tdingiz!'), backgroundColor: Color(0xFF10B981)));
        await Future.delayed(const Duration(milliseconds: 1500));
        if (mounted) Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (context) => DashboardScreen(phoneNumber: widget.phoneNumber)), (route) => false);
      }
    } catch (e) {
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Xatolik: $e'), backgroundColor: Colors.redAccent));
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(backgroundColor: Colors.white, elevation: 0, leading: IconButton(icon: const Icon(LucideIcons.chevron_left, color: Colors.black, size: 20), onPressed: () => Navigator.pop(context))),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(AppStrings.get('register_title'), style: const TextStyle(fontFamily: 'Satoshi', fontSize: 26, fontWeight: FontWeight.w700, color: Colors.black, letterSpacing: -0.8)).animate().fade().slideX(begin: -0.1),
              const SizedBox(height: 32),
              _buildFieldLabel(AppStrings.get('first_name')),
              _buildInput(_firstNameController, AppStrings.get('first_name')),
              const SizedBox(height: 20),
              _buildFieldLabel(AppStrings.get('last_name')),
              _buildInput(_lastNameController, AppStrings.get('last_name')),
              const SizedBox(height: 20),
              _buildFieldLabel(AppStrings.get('province')),
              _buildShadcnDropdown(value: _selectedProvince, hint: AppStrings.get('province'), items: _provinces, onChanged: (val) => setState(() { _selectedProvince = val; _selectedDistrict = null; })),
              const SizedBox(height: 20),
              _buildFieldLabel(AppStrings.get('district')),
              _buildShadcnDropdown(value: _selectedDistrict, hint: AppStrings.get('district'), items: _selectedProvince != null ? (_districts[_selectedProvince!] ?? []) : [], onChanged: (val) => setState(() => _selectedDistrict = val)),
              const SizedBox(height: 20),
              _buildFieldLabel(AppStrings.get('birth_date')),
              _buildCustomDatePicker(),
              const SizedBox(height: 48),
              Center(child: _buildSubmitButton()),
              const SizedBox(height: 40),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFieldLabel(String label) => Padding(padding: const EdgeInsets.only(left: 4, bottom: 8.0), child: Text(label, style: const TextStyle(fontFamily: 'Satoshi', fontSize: 13, fontWeight: FontWeight.w600, color: Colors.black54)));

  Widget _buildInput(TextEditingController controller, String placeholder) => Container(height: 44, decoration: BoxDecoration(color: const Color(0xFFF8F8F9), borderRadius: BorderRadius.circular(8), border: Border.all(color: Colors.black.withOpacity(0.08))), child: TextField(controller: controller, style: const TextStyle(fontFamily: 'Satoshi', fontSize: 14, fontWeight: FontWeight.w500), decoration: InputDecoration(border: InputBorder.none, contentPadding: const EdgeInsets.symmetric(horizontal: 16), hintText: placeholder, hintStyle: const TextStyle(color: Colors.black26, fontSize: 14)), onChanged: (_) => setState(() {})));

  Widget _buildShadcnDropdown({required String? value, required String hint, required List<String> items, required Function(String?) onChanged}) => GestureDetector(onTap: () => _showShadcnMenu(context, items, hint, value, onChanged), child: Container(height: 44, padding: const EdgeInsets.symmetric(horizontal: 16), decoration: BoxDecoration(color: const Color(0xFFF8F8F9), borderRadius: BorderRadius.circular(8), border: Border.all(color: Colors.black.withOpacity(0.08))), child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [Text(value ?? hint, style: TextStyle(fontFamily: 'Satoshi', fontSize: 14, fontWeight: value != null ? FontWeight.w500 : FontWeight.w400, color: value != null ? Colors.black : Colors.black26)), const Icon(LucideIcons.chevrons_up_down, size: 14, color: Colors.black45)])));

  void _showShadcnMenu(BuildContext context, List<String> items, String title, String? currentValue, Function(String?) onSelected) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      useSafeArea: true,
      builder: (context) => Container(
        margin: const EdgeInsets.all(12),
        padding: const EdgeInsets.only(bottom: 12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.black.withOpacity(0.05)),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 40, offset: const Offset(0, 20))],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Padding(padding: const EdgeInsets.symmetric(vertical: 14), child: Text(title, style: const TextStyle(fontFamily: 'Satoshi', fontWeight: FontWeight.w700, fontSize: 15))),
            const Divider(height: 1, color: Color(0xFFF1F1F2)),
            Flexible(
              child: ConstrainedBox(
                constraints: BoxConstraints(maxHeight: MediaQuery.of(context).size.height * 0.5),
                child: ListView.separated(
                  shrinkWrap: true,
                  itemCount: items.length,
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
                  separatorBuilder: (context, index) => const SizedBox(height: 2),
                  itemBuilder: (context, index) {
                    final isSelected = items[index] == currentValue;
                    return Material(
                      color: Colors.transparent,
                      child: InkWell(
                        onTap: () { onSelected(items[index]); Navigator.pop(context); },
                        borderRadius: BorderRadius.circular(8),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                          decoration: BoxDecoration(borderRadius: BorderRadius.circular(8), color: isSelected ? const Color(0xFFF4F4F5) : Colors.transparent),
                          child: Row(
                            children: [
                              Expanded(child: Text(items[index], style: TextStyle(fontFamily: 'Satoshi', fontSize: 14, fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500))),
                              if (isSelected) const Icon(LucideIcons.check, size: 14, color: Color(0xFF10B981))
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ).animate().slideY(begin: 0.1).fade(),
    );
  }

  Widget _buildCustomDatePicker() => GestureDetector(onTap: () => _showCustomDatePicker(), child: Container(height: 44, padding: const EdgeInsets.symmetric(horizontal: 16), decoration: BoxDecoration(color: const Color(0xFFF8F8F9), borderRadius: BorderRadius.circular(8), border: Border.all(color: Colors.black.withOpacity(0.08))), child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [Text(_selectedDate == null ? AppStrings.get('birth_date') : DateFormat('dd/MM/yyyy').format(_selectedDate!), style: TextStyle(fontFamily: 'Satoshi', fontSize: 14, color: _selectedDate == null ? Colors.black26 : Colors.black, fontWeight: _selectedDate != null ? FontWeight.w500 : FontWeight.w400)), const Icon(LucideIcons.calendar, size: 14, color: Colors.black45)])));

  void _showCustomDatePicker() {
    int d = _selectedDate?.day ?? 1; int m = _selectedDate?.month ?? 1; int y = _selectedDate?.year ?? 2000;
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        margin: const EdgeInsets.all(12),
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(AppStrings.get('birth_date'), style: const TextStyle(fontFamily: 'Satoshi', fontWeight: FontWeight.w700, fontSize: 16)),
            const SizedBox(height: 24),
            Row(
              children: [
                Expanded(child: _buildPickerDropdown(value: d, items: List.generate(31, (i) => i + 1), label: 'Day', onChanged: (val) => setState(() => d = val!))),
                const SizedBox(width: 8),
                Expanded(child: _buildPickerDropdown(value: m, items: List.generate(12, (i) => i + 1), label: 'Month', onChanged: (val) => setState(() => m = val!))),
                const SizedBox(width: 8),
                Expanded(child: _buildPickerDropdown(value: y, items: List.generate(100, (i) => DateTime.now().year - i), label: 'Year', onChanged: (val) => setState(() => y = val!))),
              ],
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton(
                onPressed: () { setState(() { _selectedDate = DateTime(y, m, d); }); Navigator.pop(context); },
                style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF10B981), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)), elevation: 0),
                child: const Text('Confirm', style: TextStyle(fontFamily: 'Satoshi', color: Colors.white, fontWeight: FontWeight.w700)),
              ),
            ),
          ],
        ),
      ).animate().slideY(begin: 0.1).fade(),
    );
  }

  Widget _buildPickerDropdown({required int value, required List<int> items, required String label, required Function(int?) onChanged}) => Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(label, style: const TextStyle(fontSize: 11, color: Colors.black38, fontFamily: 'Satoshi', fontWeight: FontWeight.w600)), const SizedBox(height: 4), Container(padding: const EdgeInsets.symmetric(horizontal: 8), decoration: BoxDecoration(color: const Color(0xFFF8F8F9), borderRadius: BorderRadius.circular(8), border: Border.all(color: Colors.black.withOpacity(0.05))), child: DropdownButtonHideUnderline(child: DropdownButton<int>(value: value, isExpanded: true, icon: const Icon(LucideIcons.chevron_down, size: 12), items: items.map((i) => DropdownMenuItem(value: i, child: Text(i.toString().padLeft(2, '0'), style: const TextStyle(fontFamily: 'Satoshi', fontSize: 13)))).toList(), onChanged: onChanged)))]);

  Widget _buildSubmitButton() {
    bool isComplete = _firstNameController.text.isNotEmpty && _lastNameController.text.isNotEmpty && _selectedProvince != null && _selectedDate != null;
    return Padding(
      padding: const EdgeInsets.only(bottom: 40), // Pasroq tushirildi
      child: Container(width: 220, height: 48, decoration: BoxDecoration(borderRadius: BorderRadius.circular(10), boxShadow: [if (isComplete && !_isLoading) BoxShadow(color: const Color(0xFF10B981).withOpacity(0.1), blurRadius: 20, offset: const Offset(0, 10))]), child: ElevatedButton(onPressed: (isComplete && !_isLoading) ? _saveToSupabase : null, style: ElevatedButton.styleFrom(backgroundColor: isComplete ? const Color(0xFF10B981) : const Color(0xFFF1F1F2), foregroundColor: Colors.white, elevation: 0, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)), disabledBackgroundColor: const Color(0xFFF1F1F2)), child: _isLoading ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) : Row(mainAxisAlignment: MainAxisAlignment.center, children: [Text(AppStrings.get('continue'), style: const TextStyle(fontFamily: 'Satoshi', fontSize: 14, fontWeight: FontWeight.w700)), const SizedBox(width: 8), Icon(LucideIcons.user_plus, size: 16, color: isComplete ? Colors.white : Colors.black26)]))),
    );
  }
}
