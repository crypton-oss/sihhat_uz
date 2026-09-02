import 'package:flutter_test/flutter_test.dart';
import 'package:sihhat_uz/main.dart';

void main() {
  testWidgets('Sihhat UZ basic test', (WidgetTester tester) async {
    await tester.pumpWidget(const SihhatApp());
    expect(find.text('Sihhat UZ boshlanmoqda...'), findsOneWidget);
  });
}
