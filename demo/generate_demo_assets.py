import os
import math
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

os.makedirs("demo", exist_ok=True)

def create_guilloche(draw, width, height, color=(30, 60, 90, 40)):
    # Draw subtle background security patterns
    for i in range(0, width, 40):
        draw.arc([i - 100, 50, i + 100, height - 50], 0, 360, fill=color, width=1)
    for i in range(0, height, 30):
        draw.line([0, i, width, i], fill=(20, 50, 80, 25), width=1)

def draw_portrait(draw, x, y, w, h, person_type="man1"):
    # Draw realistic stylized avatar portrait
    # Background
    draw.rectangle([x, y, x + w, y + h], fill=(210, 225, 240), outline=(100, 130, 160), width=2)
    # Body/Suit
    if person_type == "man1":
        draw.ellipse([x + 10, y + h - 60, x + w - 10, y + h + 80], fill=(25, 45, 75)) # Dark blue suit
        draw.polygon([(x + w//2 - 15, y + h - 50), (x + w//2, y + h - 10), (x + w//2 + 15, y + h - 50)], fill=(180, 30, 40)) # Tie
        draw.polygon([(x + w//2 - 20, y + h - 60), (x + w//2, y + h - 35), (x + w//2 + 20, y + h - 60)], fill=(245, 245, 250)) # Shirt collar
        # Face
        draw.ellipse([x + w//2 - 32, y + 25, x + w//2 + 32, y + 105], fill=(215, 175, 140))
        # Hair
        draw.arc([x + w//2 - 35, y + 18, x + w//2 + 35, y + 65], 180, 360, fill=(30, 25, 20), width=12)
        # Eyes
        draw.ellipse([x + w//2 - 18, y + 55, x + w//2 - 10, y + 63], fill=(30, 30, 30))
        draw.ellipse([x + w//2 + 10, y + 55, x + w//2 + 18, y + 63], fill=(30, 30, 30))
        # Eyebrows
        draw.line([(x + w//2 - 22, y + 48), (x + w//2 - 8, y + 50)], fill=(20, 20, 20), width=3)
        draw.line([(x + w//2 + 8, y + 50), (x + w//2 + 22, y + 48)], fill=(20, 20, 20), width=3)
        # Nose & Mouth
        draw.line([(x + w//2, y + 62), (x + w//2 - 3, y + 75), (x + w//2 + 4, y + 75)], fill=(180, 140, 110), width=2)
        draw.arc([x + w//2 - 12, y + 78, x + w//2 + 12, y + 92], 20, 160, fill=(140, 60, 60), width=2)
    elif person_type == "woman1":
        draw.ellipse([x + 10, y + h - 55, x + w - 10, y + h + 80], fill=(85, 35, 65)) # Burgundy coat
        # Hair back
        draw.ellipse([x + w//2 - 42, y + 20, x + w//2 + 42, y + 115], fill=(45, 25, 20))
        # Face
        draw.ellipse([x + w//2 - 30, y + 30, x + w//2 + 30, y + 100], fill=(235, 195, 165))
        # Hair front
        draw.arc([x + w//2 - 38, y + 15, x + w//2 + 38, y + 70], 170, 370, fill=(45, 25, 20), width=16)
        # Eyes
        draw.ellipse([x + w//2 - 18, y + 55, x + w//2 - 10, y + 63], fill=(40, 60, 40))
        draw.ellipse([x + w//2 + 10, y + 55, x + w//2 + 18, y + 63], fill=(40, 60, 40))
        # Lips
        draw.arc([x + w//2 - 12, y + 78, x + w//2 + 12, y + 90], 0, 180, fill=(180, 40, 50), width=3)
    elif person_type == "man2":
        draw.ellipse([x + 10, y + h - 60, x + w - 10, y + h + 80], fill=(40, 55, 60))
        draw.ellipse([x + w//2 - 34, y + 25, x + w//2 + 34, y + 105], fill=(225, 185, 150))
        # Short blonde hair
        draw.arc([x + w//2 - 36, y + 16, x + w//2 + 36, y + 55], 180, 360, fill=(160, 130, 70), width=14)
        draw.ellipse([x + w//2 - 18, y + 55, x + w//2 - 10, y + 63], fill=(20, 40, 80))
        draw.ellipse([x + w//2 + 10, y + 55, x + w//2 + 18, y + 63], fill=(20, 40, 80))
        draw.arc([x + w//2 - 10, y + 80, x + w//2 + 10, y + 90], 10, 170, fill=(130, 70, 70), width=2)
        # Glasses
        draw.rectangle([x + w//2 - 24, y + 50, x + w//2 - 5, y + 68], outline=(20, 20, 20), width=2)
        draw.rectangle([x + w//2 + 5, y + 50, x + w//2 + 24, y + 68], outline=(20, 20, 20), width=2)
        draw.line([(x + w//2 - 5, y + 58), (x + w//2 + 5, y + 58)], fill=(20, 20, 20), width=2)

def generate_passport_valid():
    img = Image.new("RGB", (850, 560), (242, 245, 248))
    draw = ImageDraw.Draw(img)
    
    draw.rectangle([0, 0, 850, 70], fill=(24, 43, 73))
    create_guilloche(draw, 850, 560)
    
    draw.ellipse([35, 12, 80, 57], outline=(218, 165, 32), width=3)
    draw.polygon([(57, 18), (68, 38), (46, 38)], fill=(218, 165, 32))
    
    draw.text((95, 16), "REPUBLIC OF ANTIGRAV-LAND", fill=(255, 255, 255))
    draw.text((95, 38), "PASSPORT / PASSEPORT - OFFICIAL TRAVEL DOCUMENT", fill=(180, 210, 245))
    
    draw.ellipse([680, 180, 800, 300], outline=(200, 220, 240), width=2)
    draw.text((700, 235), "SECURE", fill=(190, 210, 230))
    
    draw_portrait(draw, 45, 100, 170, 220, person_type="man1")
    
    fields = [
        ("Type / Type", "P", "Code of State", "IND"),
        ("Passport No. / Passeport No.", "DEMO-IN-482913", "", ""),
        ("Surname / Nom", "KUMAR", "Given Names / Prenoms", "ARUN"),
        ("Nationality / Nationalite", "INDIAN", "Date of Birth / Date de Naissance", "15 APR 1998"),
        ("Sex / Sexe", "M", "Place of Birth / Lieu de Naissance", "NEW DELHI"),
        ("Date of Issue / Date de Delivrance", "10 JAN 2021", "Authority / Autorite", "PASSPORT OFFICE"),
        ("Date of Expiry / Date d'Expiration", "09 JAN 2031", "", "")
    ]
    
    cur_y = 95
    for row in fields:
        draw.text((245, cur_y), row[0].upper(), fill=(100, 115, 130))
        draw.text((245, cur_y + 14), row[1], fill=(15, 25, 40))
        if row[2]:
            draw.text((530, cur_y), row[2].upper(), fill=(100, 115, 130))
            draw.text((530, cur_y + 14), row[3], fill=(15, 25, 40))
        cur_y += 36
        
    draw.rectangle([0, 430, 850, 560], fill=(230, 235, 240), outline=(180, 190, 205), width=2)
    mrz_line1 = "P<INDKUMAR<<ARUN<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
    mrz_line2 = "482913<<5IND9804152M3101097<<<<<<<<<<<<<<<4"
    
    draw.text((35, 455), mrz_line1, fill=(10, 20, 30))
    draw.text((35, 495), mrz_line2, fill=(10, 20, 30))
    
    img.save("demo/sample_passport_valid.png")
    print("Created demo/sample_passport_valid.png")

def generate_visa_tampered():
    img = Image.new("RGB", (850, 560), (250, 248, 242))
    draw = ImageDraw.Draw(img)
    
    draw.rectangle([0, 0, 850, 70], fill=(35, 65, 55))
    create_guilloche(draw, 850, 560, color=(50, 80, 60, 40))
    
    draw.text((45, 16), "SCHENGEN / TOURIST VISA ENTRY PERMIT", fill=(255, 255, 255))
    draw.text((45, 38), "DOCUMENT REGISTRATION & IMMIGRATION CONTROL", fill=(190, 230, 210))
    
    draw_portrait(draw, 45, 100, 170, 220, person_type="woman1")
    draw.rectangle([43, 98, 217, 322], outline=(230, 50, 50), width=1)
    
    draw.ellipse([640, 120, 770, 250], outline=(180, 50, 50), width=3)
    draw.text((660, 175), "IMMIGRATION", fill=(180, 50, 50))
    draw.text((680, 195), "CHECKED", fill=(180, 50, 50))
    
    fields = [
        ("Valid For", "SCHENGEN STATES", "Type of Visa", "C (TOURIST)"),
        ("Visa Number", "DEMO-EU-739421", "Number of Entries", "MULTIPLE"),
        ("From / Du", "12-05-2023", "Until / Au (TAMPERED)", "31-12-2029"),
        ("Surname, Name", "VANCE, ELENA", "Passport No.", "P-9928174"),
        ("Nationality", "FRA", "Duration of Stay", "90 DAYS"),
        ("Issued In", "PARIS CONSULATE", "Date of Issue", "10-05-2023")
    ]
    
    cur_y = 95
    for i, row in enumerate(fields):
        draw.text((245, cur_y), row[0].upper(), fill=(100, 115, 120))
        if "TAMPERED" in row[2]:
            draw.text((245, cur_y + 14), row[1], fill=(20, 30, 25))
            draw.rectangle([525, cur_y + 10, 680, cur_y + 32], fill=(255, 255, 220), outline=(220, 100, 50), width=1)
            draw.text((530, cur_y), row[2].upper(), fill=(200, 60, 40))
            draw.text((530, cur_y + 14), row[3], fill=(10, 10, 10))
        else:
            draw.text((245, cur_y + 14), row[1], fill=(20, 30, 25))
            if row[2]:
                draw.text((530, cur_y), row[2].upper(), fill=(100, 115, 120))
                draw.text((530, cur_y + 14), row[3], fill=(20, 30, 25))
        cur_y += 36
        
    draw.rectangle([0, 430, 850, 560], fill=(235, 240, 235), outline=(170, 190, 180), width=2)
    mrz_line1 = "VCEUFRAVANCE<<ELENA<<<<<<<<<<<<<<<<<<<<<<<<<"
    mrz_line2 = "739421<<2FRA8907248F2311124<<<<<<<<<<<<<<<8"
    
    draw.text((35, 455), mrz_line1, fill=(10, 25, 15))
    draw.text((35, 495), mrz_line2, fill=(10, 25, 15))
    
    img.save("demo/sample_visa_tampered.png")
    print("Created demo/sample_visa_tampered.png")

def generate_id_mismatch():
    img = Image.new("RGB", (850, 560), (245, 245, 250))
    draw = ImageDraw.Draw(img)
    
    draw.rectangle([0, 0, 850, 70], fill=(50, 40, 70))
    create_guilloche(draw, 850, 560, color=(60, 50, 80, 40))
    
    draw.text((45, 16), "NATIONAL CITIZEN IDENTIFICATION CARD", fill=(255, 255, 255))
    draw.text((45, 38), "MINISTRY OF HOME AFFAIRS & SECURE IDENTITY", fill=(210, 200, 230))
    
    draw_portrait(draw, 45, 100, 170, 220, person_type="man2")
    
    fields = [
        ("Identity No.", "DEMO-ID-582914", "Card Status", "ACTIVE / VERIFIED"),
        ("Full Name", "CHEN, MARCUS", "Nationality", "SGP"),
        ("Date of Birth", "22-09-1994", "Gender", "MALE"),
        ("Address", "74 ORCHARD ROAD #12-04", "Postal Code", "238888"),
        ("Date of Issue", "14-02-2020", "Valid Until", "14-02-2030"),
        ("Blood Group", "O+", "Organ Donor", "YES")
    ]
    
    cur_y = 95
    for row in fields:
        draw.text((245, cur_y), row[0].upper(), fill=(110, 100, 130))
        draw.text((245, cur_y + 14), row[1], fill=(25, 20, 35))
        if row[2]:
            draw.text((530, cur_y), row[2].upper(), fill=(110, 100, 130))
            draw.text((530, cur_y + 14), row[3], fill=(25, 20, 35))
        cur_y += 36
        
    draw.rectangle([0, 430, 850, 560], fill=(235, 230, 245), outline=(190, 180, 205), width=2)
    mrz1 = "I<SGP582914<<<9<<<<<<<<<<<<<<<"
    mrz2 = "9409224M3002148SGP<<<<<<<<<<<8"
    mrz3 = "CHEN<<MARCUS<<<<<<<<<<<<<<<<<<"
    
    draw.text((35, 440), mrz1, fill=(20, 15, 30))
    draw.text((35, 475), mrz2, fill=(20, 15, 30))
    draw.text((35, 510), mrz3, fill=(20, 15, 30))
    
    img.save("demo/sample_id_mismatch.png")
    print("Created demo/sample_id_mismatch.png")

def generate_presented_faces():
    img_match = Image.new("RGB", (400, 400), (220, 230, 240))
    draw_match = ImageDraw.Draw(img_match)
    draw_portrait(draw_match, 50, 30, 300, 340, person_type="man1")
    enhancer = ImageEnhance.Brightness(img_match)
    img_match = enhancer.enhance(1.05)
    img_match.save("demo/presented_face_match.png")
    print("Created demo/presented_face_match.png")
    
    img_mismatch = Image.new("RGB", (400, 400), (230, 220, 230))
    draw_mismatch = ImageDraw.Draw(img_mismatch)
    draw_portrait(draw_mismatch, 50, 30, 300, 340, person_type="woman1")
    img_mismatch.save("demo/presented_face_mismatch.png")
    print("Created demo/presented_face_mismatch.png")

if __name__ == "__main__":
    generate_passport_valid()
    generate_visa_tampered()
    generate_id_mismatch()
    generate_presented_faces()
    print("All synthetic demo assets generated successfully!")
