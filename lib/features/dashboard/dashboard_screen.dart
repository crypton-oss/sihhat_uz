import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sihhat_uz/core/localization/app_strings.dart';

class DashboardScreen extends StatefulWidget {
  final String phoneNumber;
  const DashboardScreen({super.key, required this.phoneNumber});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _selectedIndex = 0;
  Map<String, dynamic>? _userData;
  bool _isLoading = true;
  bool _isExpanded = false;

  @override
  void initState() {
    super.initState();
    _fetchUserData();
  }

  Future<void> _fetchUserData() async {
    try {
      final supabase = Supabase.instance.client;
      final data = await supabase.from('users').select().eq('phone_number', widget.phoneNumber).maybeSingle();
      if (mounted) { setState(() { _userData = data; _isLoading = false; }); }
    } catch (e) { if (mounted) setState(() => _isLoading = false); }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        children: [
          // Background Accents
          Positioned(top: -100, right: -50, child: Container(width: 300, height: 300, decoration: BoxDecoration(shape: BoxShape.circle, gradient: RadialGradient(colors: [const Color(0xFF10B981).withOpacity(0.08), Colors.transparent])))),
          Positioned(bottom: 100, left: -100, child: Container(width: 400, height: 400, decoration: BoxDecoration(shape: BoxShape.circle, gradient: RadialGradient(colors: [const Color(0xFF064E3B).withOpacity(0.05), Colors.transparent])))),
          Positioned.fill(child: BackdropFilter(filter: ImageFilter.blur(sigmaX: 60, sigmaY: 60), child: Container(color: Colors.transparent))),
          
          // Content
          Positioned.fill(child: _isLoading ? const Center(child: CircularProgressIndicator(color: Color(0xFF10B981))) : _buildPageContent()),
          
          // Overlay
          if (_isExpanded) GestureDetector(onTap: () => setState(() => _isExpanded = false), child: Container(color: Colors.black.withOpacity(0.12)).animate().fade(duration: 200.ms)),
          
          // Profile Notch
          if (_selectedIndex == 0) Positioned(top: MediaQuery.of(context).padding.top + 10, left: 0, right: 0, child: Center(child: _buildProfileNotch())),
        ],
      ),
      bottomNavigationBar: _buildBottomNav(),
    );
  }

  Widget _buildProfileNotch() {
    if (_isLoading) return const SizedBox.shrink();
    final firstName = _userData?['first_name'] ?? 'User';
    final lastName = _userData?['last_name'] ?? '';
    final province = _userData?['province'] ?? '';
    final district = _userData?['district'] ?? '';
    return AnimatedContainer(
      duration: const Duration(milliseconds: 450), curve: Curves.easeInOutQuart,
      width: _isExpanded ? MediaQuery.of(context).size.width - 40 : 180,
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(_isExpanded ? 24 : 32), border: Border.all(color: Colors.black.withOpacity(0.08), width: 0.8), boxShadow: [BoxShadow(color: Colors.black.withOpacity(_isExpanded ? 0.15 : 0.06), blurRadius: 30, offset: const Offset(0, 12))]),
      child: Material(color: Colors.transparent, child: InkWell(onTap: () => setState(() => _isExpanded = !_isExpanded), borderRadius: BorderRadius.circular(_isExpanded ? 24 : 32), splashColor: Colors.black.withOpacity(0.02), child: Padding(padding: const EdgeInsets.all(6), child: Column(mainAxisSize: MainAxisSize.min, children: [Row(children: [_buildPremiumAvatar(), const SizedBox(width: 12), Expanded(child: Text(firstName, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontFamily: 'Satoshi', fontSize: 14, fontWeight: FontWeight.w700, color: Colors.black, letterSpacing: -0.2))), if (_isExpanded) const Icon(LucideIcons.x, size: 14, color: Colors.black45) else const Icon(LucideIcons.chevron_down, size: 14, color: Colors.black26), const SizedBox(width: 8)]), if (_isExpanded) Padding(padding: const EdgeInsets.only(top: 16, bottom: 8, left: 6, right: 6), child: Column(children: [Row(children: [_buildNotchStat(AppStrings.get('province').toUpperCase(), province), const SizedBox(width: 10), _buildNotchStat(AppStrings.get('district').toUpperCase(), district)]), const SizedBox(height: 12), Container(width: double.infinity, padding: const EdgeInsets.all(12), decoration: BoxDecoration(color: Colors.transparent, borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.black.withOpacity(0.04))), child: Column(children: [_buildDetailItem(AppStrings.get('first_name'), firstName), const Divider(height: 16, color: Colors.black12, thickness: 0.5), _buildDetailItem(AppStrings.get('last_name'), lastName)]))])).animate().fade().slideY(begin: 0.05, end: 0)])))),
    );
  }

  Widget _buildPremiumAvatar() => Container(width: 40, height: 40, decoration: const BoxDecoration(color: Color(0xFFF4F4F5), shape: BoxShape.circle), child: ClipOval(child: SvgPicture.asset('assets/profile-circle.svg', fit: BoxFit.cover, colorFilter: ColorFilter.mode(Colors.black.withOpacity(0.15), BlendMode.srcIn))));
  Widget _buildDetailItem(String label, String value) => Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [Text(label, style: TextStyle(fontFamily: 'Satoshi', fontSize: 11, color: Colors.black.withOpacity(0.4), fontWeight: FontWeight.w600)), Text(value, style: const TextStyle(fontFamily: 'Satoshi', fontSize: 12, color: Colors.black87, fontWeight: FontWeight.w700))]);
  Widget _buildNotchStat(String label, String value) => Expanded(child: Container(padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 12), decoration: BoxDecoration(color: Colors.transparent, borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.black.withOpacity(0.05))), child: Column(children: [Text(label, style: TextStyle(fontFamily: 'Satoshi', fontSize: 9, fontWeight: FontWeight.w800, color: Colors.black.withOpacity(0.3), letterSpacing: 0.5)), const SizedBox(height: 4), Text(value, maxLines: 1, textAlign: TextAlign.center, overflow: TextOverflow.ellipsis, style: const TextStyle(fontFamily: 'Satoshi', fontSize: 12, fontWeight: FontWeight.w700, color: Colors.black87))])));

  Widget _buildPageContent() {
    final List<Widget> pages = [
      _buildHomeContent(),
      _buildSanatoriumsList(), // Buyurtmalar (Sanatoriyalar) bo'limi
      _buildMessagesContent(),
      _buildProfileContent()
    ];
    return pages[_selectedIndex];
  }

  Widget _buildSanatoriumsList() {
    return StreamBuilder(
      stream: Supabase.instance.client.from('sanatoriums').stream(primaryKey: ['id']),
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return const Center(child: CircularProgressIndicator(color: Color(0xFF10B981)));
        }
        final sanatoriums = snapshot.data!;
        if (sanatoriums.isEmpty) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(LucideIcons.building_2, size: 64, color: Colors.black.withOpacity(0.05)),
                const SizedBox(height: 16),
                Text(
                  "Hozircha sanatoriyalar yo'q",
                  style: TextStyle(fontFamily: 'Satoshi', fontSize: 16, color: Colors.black.withOpacity(0.4), fontWeight: FontWeight.w600),
                ),
              ],
            ),
          );
        }

        return ListView.builder(
          padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 80, left: 20, right: 20, bottom: 100),
          itemCount: sanatoriums.length,
          itemBuilder: (context, index) {
            final item = sanatoriums[index];
            return Container(
              margin: const EdgeInsets.only(bottom: 20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: Colors.black.withOpacity(0.05)),
                boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 20, offset: const Offset(0, 8))],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Rasm
                  if (item['image1'] != null)
                    ClipRRect(
                      borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
                      child: Image.network(
                        item['image1'],
                        height: 180,
                        width: double.infinity,
                        fit: BoxFit.cover,
                        errorBuilder: (c, e, s) => Container(
                          height: 180,
                          color: Colors.grey[100],
                          child: const Icon(LucideIcons.image, color: Colors.black12),
                        ),
                      ),
                    ),
                  Padding(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Expanded(
                              child: Text(
                                item['name'] ?? '',
                                style: const TextStyle(fontFamily: 'Satoshi', fontSize: 18, fontWeight: FontWeight.w800),
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(color: const Color(0xFF10B981).withOpacity(0.1), borderRadius: BorderRadius.circular(8)),
                              child: Text(
                                "${item['daily_price']} UZS",
                                style: const TextStyle(color: Color(0xFF10B981), fontSize: 12, fontWeight: FontWeight.w800),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            Icon(LucideIcons.map_pin, size: 14, color: Colors.black.withOpacity(0.3)),
                            const SizedBox(width: 4),
                            Text(
                              item['region'] ?? '',
                              style: TextStyle(fontFamily: 'Satoshi', fontSize: 13, color: Colors.black.withOpacity(0.4), fontWeight: FontWeight.w600),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        Text(
                          item['description'] ?? '',
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(fontFamily: 'Satoshi', fontSize: 13, color: Colors.black.withOpacity(0.5), height: 1.4),
                        ),
                      ],
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


  Widget _buildHomeContent() => ListView(padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 100, left: 24, right: 24), children: [Text(AppStrings.get('home_title'), textAlign: TextAlign.center, style: const TextStyle(fontFamily: 'Satoshi', fontSize: 22, fontWeight: FontWeight.w700, color: Colors.black87)), const SizedBox(height: 12), Text(AppStrings.get('home_subtitle'), textAlign: TextAlign.center, style: TextStyle(fontFamily: 'Satoshi', fontSize: 14, color: Colors.black.withOpacity(0.4)))]);

  Widget _buildMessagesContent() => Center(child: Padding(padding: const EdgeInsets.symmetric(horizontal: 40), child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [Stack(alignment: Alignment.center, clipBehavior: Clip.none, children: [Positioned(bottom: -20, child: Container(width: 80, height: 10, decoration: BoxDecoration(color: Colors.black.withOpacity(0.08), borderRadius: const BorderRadius.all(Radius.elliptical(80, 10))))), Icon(LucideIcons.cloud, size: 100, color: const Color(0xFFF4F4F5)).animate(onPlay: (c) => c.repeat(reverse: true)).moveY(begin: -5, end: 5, duration: 2.seconds), Positioned(child: Icon(LucideIcons.zap, size: 44, color: Colors.redAccent.withOpacity(0.7)).animate(onPlay: (c) => c.repeat()).shimmer(duration: 3.seconds))]), const SizedBox(height: 60), Text(AppStrings.get('messages_empty_title'), style: const TextStyle(fontFamily: 'Satoshi', fontSize: 20, fontWeight: FontWeight.w800, color: Colors.black)), const SizedBox(height: 8), Text(AppStrings.get('messages_empty_desc'), textAlign: TextAlign.center, style: TextStyle(fontFamily: 'Satoshi', fontSize: 14, color: Colors.black.withOpacity(0.4), height: 1.5))])));

  Widget _buildProfileContent() => Padding(padding: const EdgeInsets.symmetric(horizontal: 24), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [const SizedBox(height: 70), Text(AppStrings.get('profile'), style: const TextStyle(fontFamily: 'Satoshi', fontSize: 28, fontWeight: FontWeight.w800, color: Colors.black)), const SizedBox(height: 16), InkWell(onTap: () {}, child: Padding(padding: const EdgeInsets.symmetric(vertical: 12), child: Row(children: [_buildPremiumAvatar(), const SizedBox(width: 16), Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text('${_userData?['first_name'] ?? ''} ${_userData?['last_name'] ?? ''}', style: const TextStyle(fontFamily: 'Satoshi', fontSize: 18, fontWeight: FontWeight.w700)), Text(AppStrings.get('view_profile'), style: const TextStyle(fontFamily: 'Satoshi', fontSize: 14, color: Colors.black38))])), const Icon(LucideIcons.chevron_right, size: 20, color: Colors.black54)]))), const Divider(height: 24, thickness: 0.5), Text(AppStrings.get('settings'), style: const TextStyle(fontFamily: 'Satoshi', fontSize: 20, fontWeight: FontWeight.w700)), const SizedBox(height: 12), _buildProfileItem(LucideIcons.circle_user, AppStrings.get('personal_info')), _buildProfileItem(LucideIcons.wallet, AppStrings.get('payments')), _buildProfileItem(LucideIcons.shield_check, AppStrings.get('security')), _buildProfileItem(LucideIcons.settings, AppStrings.get('settings')), _buildProfileItem(LucideIcons.languages, AppStrings.get('change_language')), _buildProfileItem(LucideIcons.info, AppStrings.get('help')), const SizedBox(height: 16), _buildProfileItem(LucideIcons.log_out, AppStrings.get('logout'), color: Colors.redAccent, showChevron: false)]));

  Widget _buildProfileItem(IconData icon, String title, {Color? color, bool showChevron = true, VoidCallback? onTap}) => Column(children: [ListTile(onTap: onTap ?? () {}, contentPadding: EdgeInsets.zero, leading: Icon(icon, color: color ?? Colors.black87, size: 22), title: Text(title, style: TextStyle(fontFamily: 'Satoshi', fontSize: 15, fontWeight: FontWeight.w500, color: color ?? Colors.black87)), trailing: showChevron ? const Icon(LucideIcons.chevron_right, size: 18, color: Colors.black26) : null), const Divider(height: 1, thickness: 0.5, color: Colors.black12)]);

  Widget _buildBottomNav() => Container(margin: const EdgeInsets.fromLTRB(24, 0, 24, 20), height: 60, decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 15, offset: const Offset(0, 4))]), child: Stack(children: [AnimatedPositioned(duration: const Duration(milliseconds: 250), curve: Curves.easeOutQuart, left: (MediaQuery.of(context).size.width - 48) / 4 * _selectedIndex, width: (MediaQuery.of(context).size.width - 48) / 4, height: 60, child: Container(margin: const EdgeInsets.symmetric(horizontal: 4, vertical: 4), decoration: BoxDecoration(color: const Color(0xFF10B981).withOpacity(0.15), borderRadius: BorderRadius.circular(16)))), Row(children: [_buildNavItem(0, LucideIcons.house, AppStrings.get('home')), _buildNavItem(1, LucideIcons.calendar_days, AppStrings.get('appointments')), _buildNavItem(2, LucideIcons.message_circle, AppStrings.get('messages')), _buildNavItem(3, LucideIcons.user_round_arrow_left, AppStrings.get('profile'))])]));
  Widget _buildNavItem(int index, IconData icon, String label) => Expanded(child: GestureDetector(onTap: () => setState(() { _selectedIndex = index; _isExpanded = false; }), behavior: HitTestBehavior.opaque, child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [Icon(icon, color: _selectedIndex == index ? const Color(0xFF10B981) : Colors.black26, size: 18), const SizedBox(height: 2), Text(label, style: TextStyle(fontFamily: 'Satoshi', fontSize: 9, fontWeight: _selectedIndex == index ? FontWeight.w700 : FontWeight.w500, color: _selectedIndex == index ? const Color(0xFF10B981) : Colors.black26))])));
}
