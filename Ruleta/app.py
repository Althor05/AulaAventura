global velocidad
global angulo_actual
global opciones
global animando
import customtkinter as ctk
from tkinter import Canvas
import math
import random
from PIL import Image
import sys
import os
def resource_path(relative_path):
    try:
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath('.')
    return os.path.join(base_path, relative_path)
MODO = 'Dark'
BG_COLOR = '#1D2D44'
CAJA_BG = '#152233'
TITULO_COLOR = '#A7DADC'
ACCENT_COLOR = '#A7DADC'
HOVER_ACCENT = '#8ac1c4'
BORDE_COLOR = '#A7DADC'
TEXT_COLOR = '#FFFFFF'
TEXT_MUTED = '#829CBA'
BTN_TEXT_COLOR = '#1D2D44'
COLORES_RULETA = ['#A7DADC', '#2A4B7C', '#8AC1C4', '#1D3557', '#E0FBFC', '#457B9D', '#B8E0D2', '#3B597B', '#95B8D1', '#25324F', '#C3D2D5', '#4A6984', '#A5C4D4', '#182538', '#82A3A1', '#5C7A92']
ctk.set_appearance_mode(MODO)
app = ctk.CTk()
app.title('RuleTínez')
app.geometry('850x550')
app.configure(fg_color=BG_COLOR)
try:
    import ctypes
    ctypes.windll.shell32.SetCurrentProcessExplicitAppUserModelID('ruletinez.app.1.0')
except Exception:
    pass
try:
    app.iconbitmap(resource_path('app.ico'))
except Exception:
    pass
try:
    img_logo = ctk.CTkImage(Image.open(resource_path('app.ico')), size=(35, 35))
except Exception:
    img_logo = None
try:
    img_girar = ctk.CTkImage(Image.open(resource_path('girar.png')), size=(24, 24))
except Exception:
    img_girar = None
try:
    img_confeti = ctk.CTkImage(Image.open(resource_path('confeti.png')), size=(28, 28))
except Exception:
    img_confeti = None
opciones = []
angulo_actual = 0
velocidad = 0
animando = False
def actualizar_opciones_en_vivo(event=None):
    global opciones
    if animando:
        return
    else:
        texto = caja_texto.get('0.0', 'end').strip()
        opciones = [linea.strip() for linea in texto.split('\n') if linea.strip()]
        dibujar_ruleta()
def dibujar_ruleta():
    canvas.delete('all')
    if not opciones:
        canvas.create_oval(20, 20, 380, 380, fill=CAJA_BG, outline=TITULO_COLOR, width=3)
        canvas.create_text(200, 200, text='Añade opciones\npara empezar', fill=TEXT_MUTED, font=('Segoe UI', 16), justify='center')
    else:
        if len(opciones) == 1:
            canvas.create_oval(20, 20, 380, 380, fill=COLORES_RULETA[0], outline='', width=0)
            texto_mostrar = opciones[0][:15] + '..' if len(opciones[0]) > 15 else opciones[0]
            canvas.create_text(200, 200, text=texto_mostrar, fill='#1D2D44', font=('Segoe UI', 20, 'bold'))
        else:
            grados_por_opcion = 360 / len(opciones)
            for i, opcion in enumerate(opciones):
                inicio_angulo = angulo_actual + i * grados_por_opcion
                color_fondo = COLORES_RULETA[i % len(COLORES_RULETA)]
                canvas.create_arc(20, 20, 380, 380, start=inicio_angulo, extent=grados_por_opcion, fill=color_fondo, outline='', width=0)
                angulo_medio = inicio_angulo + grados_por_opcion / 2
                angulo_radianes = math.radians(angulo_medio)
                radio_texto = 110
                x_texto = 200 + radio_texto * math.cos(angulo_radianes)
                y_texto = 200 - radio_texto * math.sin(angulo_radianes)
                texto_mostrar = opcion[:12] + '..' if len(opcion) > 12 else opcion
                color_texto = '#1D2D44' if i % 2 == 0 else '#FFFFFF'
                canvas.create_text(x_texto, y_texto, text=texto_mostrar, fill=color_texto, font=('Segoe UI', 12, 'bold'))
        canvas.create_oval(18, 18, 382, 382, outline=TITULO_COLOR, width=4)
        canvas.create_polygon(185, 5, 215, 5, 200, 40, fill=TITULO_COLOR, outline=BG_COLOR, width=3)
def animar_giro():
    global angulo_actual
    global velocidad
    global animando
    angulo_actual = (angulo_actual + velocidad) % 360
    dibujar_ruleta()
    velocidad *= 0.98
    if velocidad > 0.15:
        app.after(20, animar_giro)
    else:
        animando = False
        btn_girar.configure(state='normal')
        caja_texto.configure(state='normal')
        determinar_ganador()
def iniciar_giro():
    global velocidad
    global animando
    if animando or len(opciones) < 2:
        if len(opciones) == 1:
            lbl_resultado.configure(text='Añade al menos 2 opciones', text_color='#ff4c4c', image='')
        return None
    else:
        lbl_resultado.configure(text='¡GIRANDO!', image=None, text_color=TITULO_COLOR)
        btn_girar.configure(state='disabled')
        caja_texto.configure(state='disabled')
        velocidad = random.uniform(25, 45)
        animando = True
        animar_giro()
def determinar_ganador():
    grados_por_opcion = 360 / len(opciones)
    posicion_relativa = (90 - angulo_actual) % 360
    indice_ganador = int(posicion_relativa / grados_por_opcion)
    ganador = opciones[indice_ganador]
    if img_confeti:
        lbl_resultado.configure(text=f' GANADOR: {ganador.upper()}', image=img_confeti, compound='left', text_color=TITULO_COLOR)
    else:
        lbl_resultado.configure(text=f'🎉 GANADOR: {ganador.upper()} 🎉', image=None, text_color=TITULO_COLOR)
marco_izq = ctk.CTkFrame(app, fg_color='transparent', width=350)
marco_izq.pack(side='left', fill='y', padx=20, pady=20)
marco_izq.pack_propagate(False)
titulo = ctk.CTkLabel(marco_izq, text=' RuleTínez', image=img_logo, compound='left', font=('Segoe UI', 32, 'bold'), text_color=TITULO_COLOR)
titulo.pack(pady=(10, 5))
subtitulo = ctk.CTkLabel(marco_izq, text='Escribe una opción por línea:', font=('Segoe UI', 14), text_color=TEXT_MUTED)
subtitulo.pack(anchor='w', pady=(20, 5))
caja_texto = ctk.CTkTextbox(marco_izq, font=('Segoe UI', 16), fg_color=CAJA_BG, text_color=TEXT_COLOR, border_width=3, border_color=BORDE_COLOR)
caja_texto.pack(fill='both', expand=True, pady=(0, 20))
caja_texto.bind('<KeyRelease>', actualizar_opciones_en_vivo)
btn_girar = ctk.CTkButton(marco_izq, text=' GIRAR RULETA' if img_girar else '🎡 GIRAR RULETA', image=img_girar, font=('Segoe UI', 18, 'bold'), height=50, fg_color=ACCENT_COLOR, hover_color=HOVER_ACCENT, text_color=BTN_TEXT_COLOR, command=iniciar_giro)
btn_girar.pack(fill='x', pady=(0, 20))
lbl_resultado = ctk.CTkLabel(marco_izq, text='¿Qué elegirá la suerte?', font=('Segoe UI', 18, 'bold'), text_color=TITULO_COLOR)
lbl_resultado.pack(pady=10)
marco_der = ctk.CTkFrame(app, fg_color='transparent')
marco_der.pack(side='right', fill='both', expand=True, padx=20, pady=20)
canvas = Canvas(marco_der, width=400, height=400, bg=BG_COLOR, highlightthickness=0)
canvas.pack(expand=True)
actualizar_opciones_en_vivo()
app.mainloop()