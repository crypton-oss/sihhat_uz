import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:intl/intl.dart';
import 'package:flutter_animate/flutter_animate.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  
  String? _selectedProvince;
  String? _selectedDistrict;
  DateTime? _selectedDate;

  final List<String> _provinces = [
    'Toshkent sh.', 'Toshkent vil.', 'Andijon', 'Buxoro', 'Farg\'ona', 
    'Jizzax', 'Xorazm', 'Namangan', 'Navoiy', 'Qashqadaryo', 
    'Qoraqalpog\'iston Res.', 'Samarqand', 'Sirdaryo', 'Surxondaryo'
  ];

  final Map<String, List<String>> _districts = {
    'Toshkent sh.': ['Chilonzor', 'Yunusobod', 'Mirzo Ulug\'bek', 'Yashnobod', 'Mirobod', 'Sergeli'],
    'Toshkent vil.': ['Chirchiq', 'Angren', 'Olmaliq', 'Bekobod', 'Qibray', 'Zangiota'],
  };

  @override
  Widget build(BuildContext context) {
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
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Ro\'yxatdan o\'tish',
                style: TextStyle(
                  fontFamily: 'Satoshi',
                  fontSize: 26,
                  fontWeight: FontWeight.w700,
                  color: Colors.black,
                  letterSpacing: -0.5,
                ),
              ).animate().fade().slideX(begin: -0.1),
              const SizedBox(height: 32),

              _buildFieldLabel('Ism'),
              _buildInput(_firstNameController, 'Ismingizni kiriting'),
              const SizedBox(height: 20),

              _buildFieldLabel('Familiya'),
              _buildInput(_lastNameController, 'Familiyangizni kiriting'),
              const SizedBox(height: 20),

              _buildFieldLabel('Viloyat'),
              _buildShadcnDropdown(
                value: _selectedProvince,
                hint: 'Viloyatni tanlang',
                items: _provinces,
                onChanged: (val) {
                  setState(() {
                    _selectedProvince = val;
                    _selectedDistrict = null;
                  });
                },
              ),
              const SizedBox(height: 20),

              _buildFieldLabel('Tuman'),
              _buildShadcnDropdown(
                value: _selectedDistrict,
                hint: 'Tumanni tanlang',
                items: _selectedProvince != null ? (_districts[_selectedProvince!] ?? ['Boshqa']) : [],
                onChanged: (val) => setState(() => _selectedDistrict = val),
              ),
              const SizedBox(height: 20),

              _buildFieldLabel('Tug\'ilgan sana'),
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

  Widget _buildFieldLabel(String label) {
    return Padding(
      padding: const EdgeInsets.only(left: 4, bottom: 8.0),
      child: Text(
        label,
        style: const TextStyle(
          fontFamily: 'Satoshi',
          fontSize: 13,
          fontWeight: FontWeight.w600,
          color: Colors.black54,
        ),
      ),
    );
  }

  Widget _buildInput(TextEditingController controller, String placeholder) {
    return Container(
      height: 44,
      decoration: BoxDecoration(
        color: const Color(0xFFF8F8F9),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.black.withOpacity(0.06)),
      ),
      child: TextField(
        controller: controller,
        style: const TextStyle(fontFamily: 'Satoshi', fontSize: 14, fontWeight: FontWeight.w500),
        decoration: InputDecoration(
          border: InputBorder.none,
          contentPadding: const EdgeInsets.symmetric(horizontal: 16),
          hintText: placeholder,
          hintStyle: const TextStyle(color: Colors.black26, fontSize: 14),
        ),
        onChanged: (_) => setState(() {}),
      ),
    );
  }

  Widget _buildShadcnDropdown({
    required String? value,
    required String hint,
    required List<String> items,
    required Function(String?) onChanged,
  }) {
    return GestureDetector(
      onTap: () {
        _showShadcnMenu(context, items, hint, onChanged);
      },
      child: Container(
        height: 44,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        decoration: BoxDecoration(
          color: const Color(0xFFF8F8F9),
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: Colors.black.withOpacity(0.06)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              value ?? hint,
              style: TextStyle(
                fontFamily: 'Satoshi',
                fontSize: 14,
                fontWeight: value != null ? FontWeight.w500 : FontWeight.w400,
                color: value != null ? Colors.black : Colors.black26,
              ),
            ),
            const Icon(LucideIcons.chevron_down, size: 16, color: Colors.black45),
          ],
        ),
      ),
    );
  }

  void _showShadcnMenu(BuildContext context, List<String> items, String title, Function(String?) onSelected) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) {
        return Container(
          height: MediaQuery.of(context).size.height * 0.6,
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
          ),
          child: Column(
            children: [
              Container(
                margin: const EdgeInsets.only(top: 12, bottom: 8),
                width: 40, height: 4,
                decoration: BoxDecoration(color: Colors.black12, borderRadius: BorderRadius.circular(2)),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Text(title, style: const TextStyle(fontFamily: 'Satoshi', fontWeight: FontWeight.w700, fontSize: 16)),
              ),
              const Divider(height: 1),
              Expanded(
                child: ListView.separated(
                  itemCount: items.length,
                  separatorBuilder: (context, index) => const Divider(height: 1, indent: 16, endIndent: 16, color: Color(0xFFF1F1F2)),
                  itemBuilder: (context, index) {
                    return ListTile(
                      onTap: () {
                        onSelected(items[index]);
                        Navigator.pop(context);
                      },
                      hoverColor: const Color(0xFFF4F4F5),
                      title: Text(items[index], style: const TextStyle(fontFamily: 'Satoshi', fontSize: 15)),
                      trailing: const Icon(LucideIcons.chevron_right, size: 14, color: Colors.black12),
                    );
                  },
                ),
              ),
            ],
          ),
        ).animate().slideY(begin: 1, end: 0, duration: 300.ms, curve: Curves.easeOutCubic);
      },
    );
  }

  Widget _buildCustomDatePicker() {
    return GestureDetector(
      onTap: () => _showCustomDatePicker(),
      child: Container(
        height: 44,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        decoration: BoxDecoration(
          color: const Color(0xFFF8F8F9),
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: Colors.black.withOpacity(0.06)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              _selectedDate == null 
                  ? 'Sana tanlang' 
                  : DateFormat('dd/MM/yyyy').format(_selectedDate!),
              style: TextStyle(
                fontFamily: 'Satoshi',
                fontSize: 14,
                color: _selectedDate == null ? Colors.black26 : Colors.black,
                fontWeight: _selectedDate != null ? FontWeight.w500 : FontWeight.w400,
              ),
            ),
            const Icon(LucideIcons.calendar, size: 16, color: Colors.black45),
          ],
        ),
      ),
    );
  }

  void _showCustomDatePicker() {
    int selectedDay = _selectedDate?.day ?? 1;
    int selectedMonth = _selectedDate?.month ?? 1;
    int selectedYear = _selectedDate?.year ?? 2000;

    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return Container(
              padding: const EdgeInsets.all(24),
              height: 350,
              child: Column(
                children: [
                  const Text('Tug\'ilgan sanani tanlang', style: TextStyle(fontFamily: 'Satoshi', fontWeight: FontWeight.w700, fontSize: 16)),
                  const SizedBox(height: 24),
                  Row(
                    children: [
                      // Kun
                      Expanded(
                        child: _buildPickerDropdown(
                          value: selectedDay,
                          items: List.generate(31, (i) => i + 1),
                          label: 'Kun',
                          onChanged: (val) => setModalState(() => selectedDay = val!),
                        ),
                      ),
                      const SizedBox(width: 12),
                      // Oy
                      Expanded(
                        child: _buildPickerDropdown(
                          value: selectedMonth,
                          items: List.generate(12, (i) => i + 1),
                          label: 'Oy',
                          onChanged: (val) => setModalState(() => selectedMonth = val!),
                        ),
                      ),
                      const SizedBox(width: 12),
                      // Yil
                      Expanded(
                        child: _buildPickerDropdown(
                          value: selectedYear,
                          items: List.generate(100, (i) => DateTime.now().year - i),
                          label: 'Yil',
                          onChanged: (val) => setModalState(() => selectedYear = val!),
                        ),
                      ),
                    ],
                  ),
                  const Spacer(),
                  SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: ElevatedButton(
                      onPressed: () {
                        setState(() {
                          _selectedDate = DateTime(selectedYear, selectedMonth, selectedDay);
                        });
                        Navigator.pop(context);
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF10B981),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        elevation: 0,
                      ),
                      child: const Text('Tasdiqlash', style: TextStyle(fontFamily: 'Satoshi', color: Colors.white, fontWeight: FontWeight.w700)),
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildPickerDropdown({required int value, required List<int> items, required String label, required Function(int?) onChanged}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 12, color: Colors.black38, fontFamily: 'Satoshi')),
        const SizedBox(height: 4),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 8),
          decoration: BoxDecoration(
            color: const Color(0xFFF8F8F9),
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: Colors.black.withOpacity(0.05)),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<int>(
              value: value,
              isExpanded: true,
              items: items.map((i) => DropdownMenuItem(value: i, child: Text(i.toString().padLeft(2, '0'), style: const TextStyle(fontFamily: 'Satoshi', fontSize: 14)))).toList(),
              onChanged: onChanged,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSubmitButton() {
    bool isComplete = _firstNameController.text.isNotEmpty && 
                     _lastNameController.text.isNotEmpty && 
                     _selectedProvince != null && 
                     _selectedDate != null;

    return Container(
      width: 220,
      height: 48,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12), // Sal qirraroq (Sharper)
        boxShadow: [
          if (isComplete)
            BoxShadow(color: const Color(0xFF10B981).withOpacity(0.15), blurRadius: 20, offset: const Offset(0, 10)),
        ],
      ),
      child: ElevatedButton(
        onPressed: isComplete ? () {} : null,
        style: ElevatedButton.styleFrom(
          backgroundColor: isComplete ? const Color(0xFF10B981) : const Color(0xFFF1F1F2),
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
            const Text(
              'Ro\'yxatdan o\'tish',
              style: TextStyle(fontFamily: 'Satoshi', fontSize: 14, fontWeight: FontWeight.w700),
            ),
            const SizedBox(width: 8),
            Icon(LucideIcons.user_plus, size: 16, color: isComplete ? Colors.white : Colors.black26),
          ],
        ),
      ),
    );
  }
}
