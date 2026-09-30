/* =====================================================================
   🏎️🌌 GALAXIA HOT WHEELS — "Feliz día de los Hot Wheels, Gastón"
   Escena 3D con Three.js: una galaxia cian con carritos orbitando,
   palabras cortas girando y, en el centro, una figura hecha de estrellas
   que muta entre un carro y la silueta de tu imagen.
   Todo está dibujado por código: no hace falta ninguna imagen externa.
   ===================================================================== */

(function () {
  "use strict";

  /* =====================================================================
     1) CONFIGURACIÓN — CAMBIAR AQUÍ LO IMPORTANTE
     ===================================================================== */

  // Palabras cortas que giran alrededor de la galaxia (CAMBIAR AQUÍ)
  const PALABRAS = [
    "Full velocidad", "Vroom vroom", "Pista libre", "Modo turbo",
    "Nitro", "A fondo", "Sin frenos", "Motor listo",
    "Coleccionista", "Acelera", "Derrapando", "Edición limitada",
    "Gastón al volante", "Meta 🏁", "Turbo on", "Cero tráfico"
  ];

  // Mensajes que salen al tocar un carrito (CAMBIAR AQUÍ)
  const MENSAJES = [
    "En medio del caos absoluto de la vida, tenerte cerca es la única paz que me importa.",
    "Mi deseo más grande no es algo extraordinario, solo quiero abrazarte fuerte y sentir que todo está bien.",
    "Tienes esa forma de sonreír que hace que valga la pena soportar cualquier tormenta.",
    "Si tuviera que hacer un pacto para proteger algo en esta vida, sería para cuidar siempre de tu tranquilidad.",
    "A veces la vida pesa demasiado, pero basta con tomar tu mano para recuperar todas las fuerzas.",
    "No me importa lo ruidoso que sea el mundo afuera; en tus brazos todo se vuelve silencioso y cálido.",
    "Soñaba con cosas sencillas, pero conocerte hizo que hasta el día más común se sienta genial.",
    "Tienes una mirada tan sincera que destruye cualquier duda o miedo que lleve dentro.",
    "Contigo no necesito fingir nada; me aceptas exactamente con todas mis imperfecciones.",
    "Eres la luz en medio del desastre, esa presencia que lo cambia todo sin pedir nada a cambio.",
    "La gente busca metas imposibles, pero yo solo quiero acurrucarme contigo a ver pasar la tarde.",
    "Me das esa calidez tan bonita que hace que me olvide de lo frío que puede ser el resto del mundo.",
    "Tu voz tiene el poder instantáneo de calmar hasta el pensamiento más caótico de mi cabeza.",
    "Prefiero mil veces un momento simple a tu lado que cualquier gran aventura en soledad.",
    "Tienes un corazón tan noble que es imposible no querer cuidarte con la vida.",
    "No sé qué nos depare el mañana, pero mientras sea caminando a tu lado, voy con todo el valor.",
    "Tu compañía le da sentido a los días cotidianos y los transforma en recuerdos inolvidables.",
    "Eres ese refugio dulce que me enseña que está bien mostrarse vulnerable.",
    "No hay nada más valioso para mí que la sinceridad de tus abrazos al final de una jornada dura.",
    "Me enseñaste que los mejores momentos son los más simples: una buena conversación y tu presencia.",
    "Tienes una fortaleza increíble, pero la delicadeza con la que me tratas me llena el alma.",
    "Si el mundo entero se pone en contra, sé que a tu lado tengo todo el refugio que necesito.",
    "Traes tanta claridad a mi vida que contigo los miedos simplemente pierden su peso.",
    "La ternura de tus gestos es la única certeza bonita a la que siempre quiero volver.",
    "Me encanta cómo haces que las cosas más pequeñas se sientan como el premio más grande.",
    "Estar contigo es recordar que vale la pena sentirlo todo, sin reservas y sin miedo.",
    "Tu presencia es como esa luz cálida que aparece justo cuando la noche se siente más pesada.",
    "No necesito promesas gigantes; me basta con la lealtad constante de tus miradas.",
    "Eres mi lugar seguro, el único sitio donde todo cobra sentido y se siente en casa.",
  ];

  // OPCIONAL: si quieres agregar fotos reales de tus carritos, ponlas en esta
  // misma carpeta y escribe aquí sus nombres. Ejemplo: ["carro1.png", "carro2.jpg"]
  const FOTOS_CARROS = [];

  const NUM_CARROS = 30;             // carritos dibujados que orbitan
  const NUM_PARTICULAS_FIGURA = 6200; // estrellas de la figura central
  const NUM_GALAXIA = 9000;          // partículas de los brazos de la galaxia
  const NUM_ESTRELLAS = 2400;        // estrellas del fondo
  const INTERVALO_MUTACION_MS = 9000; // cada cuánto cambia la figura sola

  /* Datos de la silueta (generada a partir de la imagen que enviaste).
     No hace falta tocarlos. */
  const SILUETA = {
    w: 200, h: 205,
    mascara: "AAAAAAAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///4AAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+AAAAAAAAAAAAAAAAAAAAAAAAAAAA/////8AAAAAAAAAAAAAAAAAAAAAAAAAAAf/////wAAAAAAAAAAAAAAAAAAAAAAAAAAH//////gAAAAAAAAAAAAAAAAAAABgAAAAD///////4AAAAAAAAAAAAAAAAAAAcAAAAB///////+AAAAAAAAAAAAAAAAAAAHAAAAA////////gAAAAAAAAAAAAAAAAAABwAAAAf///////4AAAAAAAAAAAAAAAAAAAcAAAAP///////+AAAAAAAAAAAAAAAAAAAHAAAAP////////4AAAAAAAH/wAfwAAAAABwAAAf/////////gAAAAAAD/8AP/AAAAAA8AAAP/////////4AAAAAA///8D//AAAAAfAAAH//////////4AAAAD////A//+AAAAHwAAP///////////AAA4A////////wAAAB8AAD///////////wAB//////////8AAAAcAAA///////////8AA///////////AAAADAAAP///////////AAP//////////4AAAAAAAD///////////4AD///////////8AAAAAAB///////////+AD////////////AAAAAAA////////////+A////////////wAAAAAAP/////////////////////////8AAAAAAH//////////////////////////wAAAAAD///////////////////////////AAAAAA///////////////////////////8AAAAAf///////////////////////////8AAAAP////////////////////////////AAAAD////////////////////////////4AAAA////////////////////////////+AAAAf////////////////////////////wAAAP////////////////////////////8AAAD/////////////////////////////AAAB/////////////////////////////+AAA//////////////////////////////wAAP/////////////////////////////8AAB//////////////////////////////4AAP/////////////////////////////+AAD//////////////////////////////gAA//////////////////////////////4AAP//////////////////////////////AAD//////////////////////////////4AA//////////////////////////////+AAP//////////////////////////////gB///////////////////////////////4A///////////////////////////////+AP///////////////////////////////gD///////////////////////////////4A///////////////////////////////+AP///////////////////////////////gD////////////////////////////////g////////////////////////////////8P///////////////////////////////+D////////////////////////////////h////////////////////////////////4f///////////////////////////////+H////////////////////////////////h////////////////////////////////4f///////////////////////////////+H////////////////////////////////h////////////////////////////////4////////////////////////////////+P////////////////////////////////j////////////////////////////////w////////////////////////////////8P////////////////////////////////D////////////////////////////////w////////////////////////////////8f////////////////////////////////3////////////////////////////////9/////////////////////////////////f////////////////////////////////3////////////////////////////////9/////////////////////////////////f////////////////////////////////3////////////////////////////////9/////////////////////////////////f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAH////////////////////////////wAAAB////////////////////////////8AAAAf////////////////////////////AAAAH////////////////////////////wAAAD////////////////////////////8AAAB////////////////////////////gAAAA////////////////////////////gAAAAf///////////////////////////4AAAAP///////////////////////////8AAAAH////////////////////////////AAAAB////////////////////////////wAAAA////////////////////////////8AAAAf///////////////////////////+AAAAH////////////////////////////gAAAD////////////////////////////gAAAA////////////////////////////4AAAAf///////////////////////////+AAAAH////////////////////////////gAAAB////////////////////////////4AAAAf////////////////////////////AAAAP////////////////////////////wAAAD////////////////////////////8AAAA///////////////////////////w/AAAAP//////////////////////////4HwAAAD//////////////////////////4A8AAAA//////////////////////////8AOAAAAP/////////////////////////+AAAAAAD//////////////////////////AAAAAAB//////////////////////////gAAAAAAf/////////////////////////wAAAAAAH/////////////////////////4AAAAAAB/////////////////////////8AAAAAAAf////////////////////////+AAAAAAAH/////////////////////////AAAAAAAB/////////////////////////gAAAAAAAf////////////////////////wAAAAAAAP////////////////////////4AAAAAAAD////////////////////////8AAAAAAAA////////////////////////+AAAAAAAAP////////////////////////AAAAAAAAD////////////////////////gAAAAAAAA////////////////////////wAAAAAAAAf///////////////////////4AAAAAAAAH///////////////////////8AAAAAAAAB///////////////////////8AAAAAAAAA///////////////////////+AAAAAAAAAP///////////////////////ABwAAAAAAD///////////////////////wA+AAAAAAB///////////////////////8A/wAAAAAAf///////////////////////A/8AAAAAAH///////////////////////wf/AAAAAAB//////////////////////////wAAAAAAf/////////////////////////8AAAAAAP//////////////////////////AAAAAAD//////////////////////////wAAAAAB//////////////////////////8AAAAAAf//////////////////////////AAAAAAH/////////////////////wf///wAAAAAD/////////////////////4H///8AAAAAA/////////////////////8B////AAAAAAP////////////////////+Af///4AAAAAD/////////////////////gP///+AAAAAA/////////////////////4D////gAAAAAP////////////////////+B////8AAAAAH/////////////////////w/////AAAAAB///////////////////////////4AAAAAf//////////////////////////+AAAAAH///////////////////////////gAAAAB///////////////////////////8AAAAAf///////////////////////////AAAAAH///////////////////////////wAAAAB///////////////////////////8AAAAAf///////////////////////////AAAAAH///////////////////////////wAAAAB///////////////////////////8AAAAAf///////////////////////////AAAAAP///////////////////////////wAAAAD///////////////////////////+AAAAA////////////////////////////gAAAAP///////////////////////////4AAAAD///////////////////////////+AAAAB////////////////////////////wAAAAf///////////////////////////8AAAAH////////////////////////////AAAAB////////////////////////////wAAAA////////////////////////////8AAAAP////////////////////////////AAAAH////////////////////////////wAAAB////////////////////////////8AAAAf////////////////////////////AAAAP////////////////////////////wAAAD////////////////////////////8AAAA/////////////////////////////AAAAP////////////////////////////wAAAB////////////////////////////8AAAAf////////////////////////////AAAAH////////////////////////////wAAAA////////////////////////////8AAAAH////////////////////////////AAAAA////////////////////////////gAAAAH///////////////////////////4AAAAA///////////////////////////+AAAAAH///////////////////////////gAAAAB///////////////////////////4AAAAAP//////////////////////////8AAAAAA///////////////////////////AAAAAAH//////////////////////////wAAAAAA//////////////////////////8AAAAAAH/////////////////////////+AAAAAAB//////////////////////////AAAAAAAP/////////////////////////wAAAAAAD/////////////////////////wAAAAAAAf//////4D////////////////4AAAAAAAB/////8AAAAAAAH//////////8AAAAAAAAAH///wAAAAAAAAAB////////+AAAAAAAAAAAAAAAAAAAAAAAAAB///////AAAAAAAAAAAAAAAAAAAAAAAAAAAH/////gAAAAAAAAAAAAAAAAAAAAAAAAAAAA////wAAAAAA==",
    detalles: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAgAAAAAAAAAABAAAAAAAAAAAAAAAADgAAAMAAAAAAAAAAA4AAABwAAAAAAAAAAA4AAGPgAAAAAAAAAAMAAAB+AAAAAAAAAAAOAAB77AAAAAAAAAAGAAAA48AAAAAAAAAAH/gD/+4AAAAAAAAADgAAAHHwAAAAAAAAADn8I///gAAAAAAAAAwAAAA8fwAAAAAABw5wDf/vv8AAAAAAAAA8AAHADwcA4AAAAA8+4AGG55zwAAAAAAAAeAAB4APgAH/AAAANcOAAA+PGcAAAAAAAAHgAAfDA8AA/4AMGCeBwAD/A//wAAAAAAABwAAH48PgAAeADHwHw/+AOgB48cAAAAAAA8BwA+PjcAAPAAzuAP//gAAfvDvwAAAAAAHAcwHz8zgADgAMZwD94YAAf/4e8AAAAAABwHfA/fu+gAYADG8A/8CAHPjnj/5AAAAAAAB7+H5//8AHAAe+AH8AAD3884Pv4AAAAAAAezw/v//8DwAD+OA4AAA//jhH/8AAAAAAwHsMHfPv/9+AAePj7gAAN/ww4b+AAAAAAOB/j8x///PZgAOHef8AAAf4MHA/AAAAAADwP5//D3/48YADHj36AAAH/GA8HgAAAAAAMDeePwOP+HCAAzgN8AAAB/zgDgcAAA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AAAAAH/wADGP4AAAAAeAAAAAAD4AAAAAAAAD/AA/4AAxg/gAAAAH3//gAAB8AAAAAAAAA5+AP8AAYQAeAAAAA//n/AAAeAAAAAAAAAP74B/gAGMABwAAAAM///wAADAAAAAAAAAAf/gP4ABjAAPAAAAD/AD8AABwAAAAAAAAAAP+B+AAYgAB4AAAAHwf/AAA4AAAAAAAAAAP/wPgAOYAAHAAAAA+H/gAAcAAAAAAAAAA/9/B4ADGAAA8AAAAH5/8AAOAAAAAAAAAA///8fAAxgAADwAAAA/APgACAAAAAAAAAAf+f/jwAMQAAAeAAAAH4B8AAAAAAAAAAAAP4A/8+ADMAAAB4AAAA/gODAAAAAAAAAAAD4B//ngAzAAAA/AAAAH8BxwAAAAAAAAAAAcD//44AYgAAB/8AAAAfgOYAB/wAAAAAAAAH///PAGYAAH87gAAAD+I8AB//gAAAAAAAH///7wBmAAP4HeAAAAP/vAB//+AAAAAAAD+Pz+8AZgAfgA5wAAAB//gB/w/4AAAAAAB+////AMwD+AAGOAAAAH/4D/gD/AAAAAAA+8A///nMH8AABxgAAAA9eH/gAfwAAAAAAf8D//////wAAAMMAAAADyv/PwA8AAAAAAP8HwAf//+AAAADBgAAAAe////gAAAAAAAP+DgAAH8AAAAAAQOAAAAB////+AAAAAAAH+DwAAAAAAAAAAEBwAAAAD//8/wAAAAAAD/BwAAAAAAAAAABAOAAAAAP/wB/AAAAAAAfA4AAAAAAAAAAAQA4AAAAAP//38AAAAAAPwcAAAAAAAAAAAEAHAAAAAAP4P/gAAAAADwOAAAAAAAAAAABAA8AAAAAAfg78AAAAAAYHAAAAAAAAAAAAwAHgAAAAAA+HfgAAAAAMDgAAAAAAAAAAAMAAcAAAAAAD4/+AAAAADAwAAAAAAAAAAAPAADgAAAAAAPDvwAAAAAAYAAAAAAAAAAAHgf/cAAAAAAA4d8AAAAAAOAAAAAAAAAAAHgP//gAAAAAAHDvAAAAAAHAAAAAAAAAAAHn/AD8AAAAAAA4dwAAAAABgAAAAAAAAAAHj/gAPgAAAAAAHDsAAAAAA4AAAAAAAAAADxwAAB8AAAAAAA4YAAAAAAMAAAAAAAAAADw4AAAPgAAAAAAHDAAAAAADAAAAAAAAAADwcAAAB8AAAAAAA4wAAAAAAYAAAAAAAAADwOAAAADgAAAAAAGGAAAAAAGAAAAAAAAADwHAAAAAcAAAAAABxgAAAAABwAAAAAAAAD4DgAAAADgAAAAAAMYAAAAAAMAAAAAAAAB4BwAAAAAcAAAAAADDAAAAAADAAAAAAAAB4A4AAAAADAAAAAABgwAAAAAAYAAAAAAAB4A8AAAAAAYAAAAAAYAAAAAAAGAAAAAAAB8AcAAAAAAHAAAAAAGAAAAAAABwAAAAAAA8AOAAAAAAA4AAAAABgAAAAAAAMAAAAAAA/AHAAAAAAAGAAAAAAYAAAAAAADgAAAAAA++Bh//+AAAHwAAAAAMAAAAAAAAYAAAAAA8D///wD+AAHuAAAAADAAAAAAAAHAAAAAA8AH8AAAD4ADhwAAAAAwAAAAAAAAwAAAAA8AAAAAAAHwHwHAAAAAMAAAAAAAAOAAAAB8AAAAAAAAf/wA4AAAADAAAAAAAABgAAAD8AAAAAAAAA/gAHAAAABgAAAAAAAAMAAAH4AAAAAAAAAAAAAcAAAAYAAAAAAAADgAAP4AAAAAAAAAAAAADwAAAOAAAAAAAAAcAB/wAAAAAAAAAAAAAAfAAADAAAAAAAAADgP/AAAAAAAAAAAAAAAA+AABgAAAAAAAAAQD4AAAAAAAAAAAAAAAAD8AAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
    cw: 48, ch: 49,
    colores: "5LOD5raH5rOB6LR57LFk7bNo7bV25axi6Kde66RU7bZl769b8LFg7rNc5KtX2qdb669W6Ktc5K9g3KZp3KNi5bJw6bt26Lt5476f2+bF2uXE1+TE2uPK5eDW4tzS4NrQ29bK2tTH1tDD2dnT3N3a3N/b3N/Z2t3W3d7V3d7U3+DX5+rY5uPX4tnS5d/V5d/V6LN/5LKB5raH5rV96bFx7LFk7rJl7bV23J9P76ZU86xR8rBO87FQ9LFM8K9P76pR761X67RX3KZp3KFe465p6bp06Lt55LaO4a+g38Ks2+bF1+TE1OLE2+HO5eDW3tnO3trO1tDD19fO2NnV3t/c3uHe3N/Z2t3U2tzT3+DX6evk6u7j5+rY5ODV4NnR5d/V87d06LR54q985raH57Fz661o7LFk8K1X8bFS8qxS9KxP869L9LFM9a1P9K9V9K5T9K1Q8bFT25tT5atg6rdr6Lt547d+47Wi4q6e3qmc28St2+bF0uPD0d7D3OLW5eDW1tDD29/Y0NPJ19fR39/e4OTj29/a1djN3+DX5uvi6/Dn7/Pp6Ovf5+rY4d3T3NXS8rVw87d06LJ03qdw5raH6Khf87BY8qxQ8bBP86tP86xQ86pM9KxP9KxP76hM7qhN7qhO76lP8LBR67Fc6Lt54qtl4q9937ub566l36Oa1aqY19O12+bFyeDD09PE6e3x6O7v3eLdy9bJxLyv7+rw5e7uzNHF3+DX5Ovl5O3k7/Pp5u3k6ezh6+zl5+rY2dbP77Vz8bhu87d06a5q1ZpX76tU87FQ861S8rFQ8rBO8rBO8qxS8apN8atQ869X8KxT76tS8q9Y8q5X77BR3J5N36Bi35195LCZ37ub7p6rz46Bq8iG3uze6PHz5+nh7/Tw7vDw5+3uzdbL3N3T6Orx6ez04Obm5+/y1+Xe7/Pp3ebdz+HHz+DD6+zl7O7v1+DR57eB7rRy8LRn87d09rJZ8bBP9LRV9LRU87NT8q1U8axS8rJS8K9O7qhO7adM76pR8q5X8a5W7a9S6aZP35NS3pxi15pr5qKk8r6x+qG57Y+YttaAzOnJ7O7p59aB4NRw6+LT4ujr19XI4+bg7e3m5uDI6tyj7e3d4+v0y9nQ1+PXudesqNCOxuG84+fi5erl4rJ757eB7bRp7a5c8rJS9bRU9bVW7rBU6KpZ7rFX6atQ7bJb6alJ8a1V7KlS8q5X8bFS7q9R7LBW4aZk0nhEznhTyYto76Wt7Z6c9qKy+Zy76Li66enj7efc8O3V6OTK8Ovn4ubcz9G92dfK4ufn6vDs59ic4tZu7erY5ezx2eTguc2bmdOAjdNz2t3C6c/S4K103Ktz57eB77Rb9LRV9bVW9bVW7q9S9M2h7suX5LVk78mQ8MGF5q1Y6a9Z4q9t6LRm7MN846hl7L6J0ntJz3hSyY9u0ZOJ8Zqx9Zix8o2r9qW98c7S7c/O6NHG2eHS4+bg6vHs4+ba09bJ4OPj7O7v6OTP7ebQ6N7G7O3n2eDgk9B0fNNm1dCl7qa17q214LZ/3qls0aJk8bRZ6KdH8a5W9bJb7KhQ8MeL69Ct+Nq448md6tC3+dqx7cON576Q8tOq9dOs8cmn+Ne22pRm0XZQyqJu1LCV576v0Mp95pyU9K6w5KKb6YeU6LGz6evr6ezz6O747fLv6O7q197U1NrL5NzD4eXY6uro6OHj4cfHn8Ru5aKg7qa18Km17sK77d684bJ94aBf7qtU6qtO8q9Y9bFa5qhX6rVx79Ky7dez4s++9Nq9+922+t238dSq+tu4+tm0+tm48Myp04BW1JmA1dGvocxxktZkkdJg7amy9Li67Jyp6Yqa7K2+3+Tm7vP57PDz6dSr6ty24d/HyM6y3drGx7Gl4sTD76S29Zi31Y2I+Ja385av7sK77bK07+bC7d68565u87VZ6K1V865U87NT5bBr5LR9+t6658im5K6Y+d++/N69/N69+968+927+927+ty668Se03pU5MfC7PPp4uDN19vB0ti45LW356yw8Z227o2k3LS17/Hv6PD36uzT6tR+49Ry7NOg7+bY3N/Uz6OY+5299pS795W29JCq7IGa+py17KGr8K227+TD8urG2qtu8a9Z7a9f76tS8rJT5Khl48ia99i2+t/C99y6/OC7/d++/d++/d++/N67+968+di48cyn14Vi372u5eC87OrY6+3f6ujW8/ry5N6948a98dnh3tbS6u7i8PLx7O7b5M542eJd6N6B697J6/Hx5rC++qS+7ZKk9ay485Gy8oyr+6C89qS38Jmr8unN7uPF5M2g7q5a761Y6JxQ8bJV36hg9uC699+7++K9/d++/d++/d++/d++/d++++C99tKv7LWR4ZZr4YVk6MW47vXt6OPI5OTM6+/g5OTL6eTK5+rc5O7k4vLu6+nY9PPy6/Ly8OnY7OO06d2u7Ofd5Ojt1Kq296y75J+N4YV+85ar8Y2o7JGR6oKQ+qG29ebS9eza7Nq44qVf7rNc3JBP76xW4a1h9d2+4tPC9NrB+tu8/uHA/uLC/eC//d+++9695J994YRc4X9b4X5g5aGU8e7x7+/j7/Tt6PPv4efh3OLW7vDg1ufYwuft2eTS4eDL9fX07u7z7vHv7/Hx8fHy5urt29/Y7uTp6NHP9LG67YqY6HmE7ImQ6YuL35Ka9ebR8ejS79m947F53pxa2pVZ451O3ahi4sCj4bqq89y++ty+/d/B/eLD/OHC/d++/Nu76ryU4IFe4IBd4X5h34dn49LK5/Dlv9K1r82ers2asc6U1+C+3efhzu7w6fHr9Pf15ujN8vLx6eDM8/D17O3h6O/z6O/y7PP06vD16M3X9qbB7ZOr446n+qW+96K49OjX8evW9OfI5saQ5auF2ptxzn1H145X0Yps68qu+uC/+dq7+Ny8+eHC9ty7/uHA/uC/7b+Y4YJg34Ff4X1f3qCJ3ujVwN+upNmJk89rlsxooMdz0PDq0uzpyu7x6vbu8/Pk7ObQ6OjQ7ene7PD07fLw5fHz7O7p6d6+6d/L6ev148jH3Hpm3oGB9Jmx6oys9u3f8O7N6+au3s+E68mj2KJ50I1bzYhTyn1L4ql9+Ne3/d7A/eLD8du79t6//uHB/eDA67qV34Ff4IVk3odn49rCv+CumNJxotZ/uN2vweDOsNurgc+DjcuP1OPW5+zn7+u26t+x7vDk6/bx6ejL6d6m6u/e7O7b6NV06Nl67eve7e/v1r+B3NOX09mC2sF89+7g7enF6uyy4duH9OK+5L2R26xu26583p5e66lw3Kpy7sin++HE++LC/d/B/uC/+ty64JBz34Ff34Fk5aaW1unKntV+m9Z50+bMx+Peut/rmtyyedBzldWbo7yH4+fc6eje7Pbx2ujj6/Xx6ufD6NaP7/Dn8fTq6NWL699v7OTL5u724r+w1bdw5Z+O2YRk8+/m7ObU6eu35OSN5dSf7sqV3K5g672C7rdw98yr8MeL7a196rOf7dS199q+/OTE+N683Ydu4YRo3Ydu8N/dvNyqvd2qzOTD5ezb1N/VwOzcw/HnxvPwqtzAmL1/qriLv829vMmzp8COy8273OPa8fPn1N/U29W97+7f6uXD7O/u5+vw6e/07t3a75Wq22928Pbw7e3f6OK83dWV28eJ07Ru07ll2Kls3Zpz6rKS2a9x4bqT4Lql0ryb1Zt+4qaJ57KY34dt4YVp256L9vT25O3Z6vHn0ejQodSUq9OUnuONtevKoOSmjc2LmMqAtsqpzu/rnL+Fns2GksF+n7yGr8aenbmEv72O6NnH7+/u6PHw5OXa5eji7vDx5snA5La5tNLDstC5tNCxqcuaqcmRssyWsc6Zus+o0sur0riazbykyr+py7mnz6GK4Ypr4IBj339o4YNr4YFp6M3J9PT79vj28PD10OTQhtSEj8x1ut6tueLYqN+3i8t7lcF8pL6CqtWheMhrjcl6hMt5jsl5l8mCk8J80sq57czX6tHc6Mva68vc5srG5d/R7vb26PDzstG8tNG7sM6srsyfvtWvz97G4Ojd5u3r8PT27/Hu4uTf2N3P2NPI2tXG5sOv3oxz3oJr34ds35GB8O7v8/X68vP46evx6vP1es13z+bBicp2nM2SqNKin8iAo8R9hMdwvdijtNeto9SZgsp6isp6jct+h8p6yM278sXj7r7W5a7E9MTn8sHl6cTU3tjE6OvgstG6sdC2yt3K7PTx7fTy7/Xy7vTx7/T07/P18PL18PL16/P18vT16O7s5Ors2t/Q0KSO1JiG3rev8fP48fT47/D26u328PH65vHr5OLafNB/rduqqM+e1Ni1oM2GkM1+sNqt9Pb3u9+7gsp3n8qDocuFhsp4mcB74cfS3rvE5LzP77/i6bnR67rW5NvN493N0N7P2eTZ7PPx7vPw7PTx7PPz7fL07fL16/L16vX16fTy7fL07fT06PTy5O/t6vDtyc61yr6u6+nr8vH48vP58/T68vP68vP56Ovt7vDwjdCR2u/fx9vH7/Xzw97H7evm8vP08PH4tNWqgsl0wc6Yr8yIhct6mb1vpsKcqcmxrMau28DL7LzX6rzQ48jK5NvN9e7p9e7q8vPx7PPx7vPw7vPz7PPz5vH15PH15/Pz5/Pz6/Hz7PL06PTy6PPx4+3v1d7PzcK88/L38O/28fH28fD28fL55ebt7/D28fL47/Ty8PL35Ojs7+/37Oz27Or57+/37/Dwq8uSos2V3861tM2Oisp6l7p4udnOr9XdrtW/jrtwuseczdW1y9K0z9S59O3p9O3p9e7q8PPy6vH07PHz5/Px4u/y4u/y4Oft5O/05fD05fD05/Px5/Pz5vPw4d7P3tLG9Ozw8PD26ubj6dnR6uTq7+z47u747e347u/26+z16+v27Oz37ez37Ov27Oz36enxtNKq2ejW39K/ttWnpMqCd8djicly2NvJ0cWmmMp2acpaesZqmcqAosuK8+zp9O3p8+zo9e7q6vDy6vDy5PDu2+jq4O7w2uDm5PDz5u/y5u/y5fHv5vLy5e3q8drJ9trE9djD7+LX8uvq89zF8drE8evq7O336+r17O307O327Oz36+v27Ov27Ov26+v25OfuztzQ7+315ODWxtzL1Migo8x/ZctZ2NzC39S/ysqMfchhdsRaeMVhgsZp8uvq8uvq8+rp8uno6fHu6vHx3+vr4O7x2Ojl1dzh4+/y6u/x6O7w5PDu5vHv5vDtzcK27eXZ7NK289y57uLU39G78dO18NvN7+no6unz7e706en26ef26un26+r16+r17uz06+nx7evz7Ory7uz07u/z49vM49XHlM+Q3+zZ2du8vM+VlMdsecZcdsRad8Rb8evr8e7u8evr8err6vDw4ujq3uns4u/y2Ojl197g5O7x6PDw5u7u5fDw6O/s5OHa0sC18/Dx5trR6tCw9ti76M+v37ub9ta67dXF7Onz7Oz06en16ej16ej16en06un07Or06+nz6ejx7uz07evz7evz7ezt4eDe4uvXyuLC3+zZxNepmcl1gsVhd8VbdsRa6+Xm7uzu7+3v7u3u6fDw2eXo3+ru3+ru0uTh3OHf5O3w4O3r4e7s5e3v5NvS5q2c9dm98tbB8NvJ4Mem9Ni88tW07Myt782w9NS46+Ph6en06Ojz6Ojz6Ojz6Ojz6Ojz6Ojy5OXv6Onz6enz7Ory6ejx5uXr7u/u5eni4uvX2OjR3+zZs9Wch8dnecVddsRa3dLO5+Tl6Ojt6erw4+7w3Ojq4Ort3OXq3Ozs2uTi4+7u3unn5u7r5u7u39HH24t37s6z89Cy9tOx9dSu9NOz9daz8tGx9NGz89Sy7NfG6unx6Ofy5+fy5+fy5ubx5ufx5ubv5efz5erz5+ny5eXu5OTr7u7w7Ozu7u/u5+zj4+zc4Ova3+zZqdOUfsVfe8Rb4NfU3dLO5eXm4OPo3+ru4O3v2uTk3eXp2+ns0+Lg4O3r4ujm5+3q5u3r3d/Q14Zt8MWt8s+x8c2q8c6s8s6v8Myu89Gv8tCu8s+t8NG26unr5+fx5ubx5ubx5eXw5OTv5uby4+Tz4+by5+jx6Orv7u/x6err5+vl5ezl4+zh4+zh4uze4Ovd3+zZsdaffsVf4tnW49rZ3dLO5Onn5ezs4u3r3Ofk1ODg2ODo1uTk3enn3ejk4uzp4uzp0t3K1oZu2Z6B5MSg886v886u9M+w8cys8s6u8s2t8s6u8c2u6OLh5ejw5eXw5eXw5eXw5ebx4OTw4OTw4Obv5ejrztDO3eDf4+Te5evl4+zh4evg4+vg4evg3+nb2OTS3OfXw9y45t3c5N7b6eLi4+rq4+nn3unl3+znzt3V2uPj1OLg1+Xj4unm4ujo3+voxdTAyqOB3Y579Myy7seq8s2t8cys8cys8Mur8cys8c6s8c6s6NvV6Oju5OTv5OTv5eXw5OTv5OXu5eXu4eLmxcnFxcnD3+Pf4OXh4uvm4Orf4erg4erg3ejc2OTS1+TR1+TR2OXS6Nra6OPi6Ojh3uXh2ODb4Ofk3uXj4Ofk1NrY2N/d4Ofl4+jm4+nn3Orhx8ep0K2F0qJ+3a+R8cqs8c2q8cuq8cys8cys8Mur8Mur8Mqp5tPD7Ofo6Ofo5OHm39zm6ebt3+Pt6Ofpw8W8zNPJ4+nk3uPg4+nm4ujj3+je4ejh3ufd2OTS1+TR1+TR2OTS1+HO59jY6Nra4+jk2+Xi197Y09nW1NvZ3uTi3+Xj2N/d4Obk4ujm4ujm2eLaxLeb06mE1KWC0KB81qiF6MCi8Mur78mo8Mqp78mo8Mqp78mo7Miq58Sq7civ7ciw6cux6c211c/C3dnS3eDZ4+jk4Obh4ujl4ufm4ebm4ebi3Obd2OTS1+TR1uTS2OTS1uDN1djC6Nna5tbZ3Obf2uPe2uDe2N/d2uDe0tnT2+Pd3OLf3uTi3uPh4Obkz9nRxrOW0qeC0amB0KN70qN60qJ+3LOQ7cSm78il7syl7sin7sin7cem7sin6cGj7cap7ceq6sOl58ipz8C25Obh3uTg4ufm4ebl4OXk2uTh2ubi2OTS1ePR1uPU1ePR1d/O1djC1tnD5tvb6Nzd2+Te2+Te3OLg2N/d2N/d2d/b1dzW2eHe197c2ePg2uXhxNDByqmJ0aeCzaB60aR90qJ5266M5Lqa3KaH47CS7sKm7cSm7cem7cem7cem7cap6sKk6sKk7MSm5Lye2tLH3ufh4OXi3uPi2N7d2d/eztvW1uPd1OLS1eLS1eLU1N/N1djC1dnD1dnD5NnZ49va2uLc197b2tjU1bOp0qOV1rOn4M2+2sq32tXG2d3R2t/TyMKnz6eF1aqJ2rCQ5b+e7cip7cem78Wl7cKh041q36GG7MSl7Mam7MWk7MWk7MWk7MWk6sKk576g4MGl4uPi1eDc1t/c2d/e3OPf3eTe1N7YytHM09/S0+HT1N7O1djC19rE1trE19rG3tbS4djX1NvW07yvzH9o2JN26LSa6ryd6cGe6b6e6cKk6cOm6cOm6sWl68Sj68Wk7Mal68al68al7MOk7cKi7L+h25V403Fd3p6C6sKk7MWj68Oh6sOi6sOi6sSj6sKk5b2f38m129O92dvO2t3a2dzY2NzY1d/Z2OHb0eDU097O1djC2NvH19vG19vG2NvH1crE1s/H0bWtzW1a2ZF36Lea6Lud6Lud6Lud6Lya6byb6MGf6MGf6MGf6cKf6MGf6cKf6cKf6b+f6sGi6cCh6MCi2JNx0nJU0nVY1Ilp5rSY6sGd6cKf6cKf6MGf6cGe6b6d6bya6L6e5b6j2auQy4xx0qmh19vU0tvW09/P1djC297L2NvH19zI2NvH2NvHz8S5ycCyw5CE1IFj5rCS5LeW5baW5baX5rmb57qZ57qZ57ua576b57+c57+c58Ce57+c57+c58Gg58Gk5MSl1rWVxp2DyZeGz6WW0J2Rzp+I4rme57+d57+c5r+c5ryc57ma57ua5r2d5b2i5b6j5cCj2JuBz5iM2tnWztrM4OTR2N3L2t7L19zK19zI19zIysi/v72wwKOQ4KOJ5K+Q47WS47WS5LaT5LeV5biV5biV5rmX5rmX5b2a5b6c5byd5ryc5b2e5MKk2bibx6ySzb2r1s7C1s/E1MvB08zC0cq60L+o4Lui5riZ5Lqb5Lqa5beZ5Lib5Luc47ye47ie47qe47ug1ZJ9ypKK0NvO1drM2d7M2dzK19zI2NvJ1tvH4uLjyM7TwK2d1qOG4qyN4q6M4rGQ4rGQ47GR5LOS5LOT5LeV5LeW5LiY5LmZ5Lqa5Lye3beeza6PyLKRzcKw1NLG09HF0tDD0tLE0dHDz8nBzcm7zMGx37yf5Lab47iX47WW47WW47eZ47ea4rWa4bma4Laa37KVwpuEztPG193H1tnG1tvH19rG19rG19rG1dze3efkxMjGzJV64auM4amI4a6M4a6M4a6N47GQ5LKQ47WR5LaT5LWX5LWX37WW0amLy6SNyqqY0Me20NXG0dPFztLD1NbJ09PF0NDCy83EyMrBycW8z7ag4LiZ4bGR4bGS4bKT4bKT4rGU4bCU4LOV37WV2quQwqeSycWz1dW82NnD1djC19jC19jC19jD3efk0djd0dnoxp2F2qGE36eH3qqI36yK4K2L4a6N4q+N4q6Q4rKS3bKRzJt1wI1gwZFtxZ2DxaiOxLOdw6mPwaWGwJ+CxKSIybafzcm6yszBx8nAyMS7wqWPyZl536+T36+P36+P36+P4LGR37GS37SU3rSU06aMwayazMOu0tK91dW81de/1Na/1de/1tfB1N3j0dnozbSmz6qcyZZ026mH3KeE3qmG3amG4KyK4K2L1qWEyJZwvoRYvoRYvolavoxavpFXvo1Vv4tXvoxavYxbvoxav4pcwIpcvotev6OIvqKGvo1owIJev4BcxIxm2aeL3a2N3a2M3q6O36+P3rCR3bOSzKeGyMiw1eDO0tXA09fC1dW81Na/1ta/1Na/0dnozLelxp+BvZBcwoxkyI9p0Zd20pt2zpFuyY5ow4Vbv4ZcvYZWvYJPvIRNu4NMvopPvYhLvIRNvoRRvYRMvIJJvIJJvYZPvodRvoFMvYBTv4RXv4NQv4FSvoJUv4Bcv4BbyZFw05+A26yM26+J26yN17CO0M+61tzG0NfB1eDO1dvJ09rE1dW81dW+1dW+z72xw5l1vZBcwJBhw5Bjx49kt2kluXI1u3Y5u3o5vH0+uXAxvYNQvYNQvIRNvYRMvYhMvYRLvYVNvYVNvYFNvINLvINLvYZPvoVMvoNPvH9LtGcat3cuuHkxunM9vXlMvX5NvYBKvoNQvoRQw41eyI1lz6+Q2dzG1tfC1tzG09vH1eDO1NzK1NjC1dW81dW+"
  };

  /* =====================================================================
     2) ESCENA BÁSICA
     ===================================================================== */

  const canvas = document.getElementById("escena3d");
  const PR = Math.min(window.devicePixelRatio || 1, 1.75);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(PR);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000306, 1);

  const escena = new THREE.Scene();
  const FOV = 58;
  const camara = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 0.1, 600);

  // Todo lo que forma el "disco" de la galaxia va en este grupo, ligeramente inclinado
  const plano = new THREE.Group();
  plano.rotation.x = 0.16;
  plano.rotation.z = 0.05;
  escena.add(plano);

  const azar = (a, b) => a + Math.random() * (b - a);
  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
  const limitar = (v, a, b) => Math.max(a, Math.min(b, v));

  /* =====================================================================
     3) TEXTURAS Y MATERIAL DE PARTÍCULAS (con parpadeo de estrellas)
     ===================================================================== */

  function texturaPunto() {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, "rgba(255,255,255,1)");
    gr.addColorStop(0.2, "rgba(255,255,255,0.85)");
    gr.addColorStop(0.5, "rgba(255,255,255,0.22)");
    gr.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = gr;
    g.fillRect(0, 0, 64, 64);
    // pequeño destello en cruz, como una estrella
    g.globalCompositeOperation = "lighter";
    const h = g.createLinearGradient(0, 32, 64, 32);
    h.addColorStop(0, "rgba(255,255,255,0)");
    h.addColorStop(0.5, "rgba(255,255,255,0.65)");
    h.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = h; g.fillRect(0, 31, 64, 2);
    const v = g.createLinearGradient(32, 0, 32, 64);
    v.addColorStop(0, "rgba(255,255,255,0)");
    v.addColorStop(0.5, "rgba(255,255,255,0.65)");
    v.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = v; g.fillRect(31, 0, 2, 64);
    return new THREE.CanvasTexture(c);
  }

  function texturaHalo() {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d");
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, "rgba(255,255,255,1)");
    gr.addColorStop(0.3, "rgba(255,255,255,0.4)");
    gr.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = gr;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }

  const TEX_PUNTO = texturaPunto();
  const TEX_HALO = texturaHalo();

  const materialesPuntos = [];

  const FRAGMENTO = `
    uniform sampler2D uMapa;
    uniform float uOpac;
    varying vec3 vColor;
    varying float vBrillo;
    void main() {
      float a = texture2D(uMapa, gl_PointCoord).a;
      gl_FragColor = vec4(vColor * (0.7 + 0.6 * vBrillo), a * uOpac);
    }
  `;

  const VERTICE_BASICO = `
    attribute vec3 aColor;
    attribute float aTam;
    attribute float aFase;
    uniform float uTiempo;
    uniform float uTam;
    uniform float uEscala;
    varying vec3 vColor;
    varying float vBrillo;
    void main() {
      vColor = aColor;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      float t = 0.6 + 0.4 * sin(uTiempo * 1.8 + aFase * 6.2831);
      vBrillo = t;
      gl_PointSize = uTam * aTam * (0.75 + 0.5 * t) * (uEscala / -mv.z);
      gl_Position = projectionMatrix * mv;
    }
  `;

  // La figura central tiene dos posiciones y dos colores por partícula, y se mezclan
  const VERTICE_FIGURA = `
    attribute vec3 aPosB;
    attribute vec3 aColor;
    attribute vec3 aColorB;
    attribute float aTam;
    attribute float aFase;
    uniform float uTiempo;
    uniform float uTam;
    uniform float uEscala;
    uniform float uMezcla;
    varying vec3 vColor;
    varying float vBrillo;
    void main() {
      float e = uMezcla * uMezcla * (3.0 - 2.0 * uMezcla);
      vec3 p = mix(position, aPosB, e);
      float remolino = sin(e * 3.14159265);
      p += vec3(
        sin(aFase * 40.0 + uTiempo * 2.0),
        cos(aFase * 31.0 + uTiempo * 1.7),
        sin(aFase * 23.0 + uTiempo * 2.3)
      ) * remolino * 2.2;
      p.x += sin(uTiempo * 1.1 + aFase * 12.0) * 0.07;
      p.y += cos(uTiempo * 1.3 + aFase * 9.0) * 0.07;
      vColor = mix(aColor, aColorB, e);
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      float t = 0.6 + 0.4 * sin(uTiempo * 2.0 + aFase * 6.2831);
      vBrillo = t;
      gl_PointSize = uTam * aTam * (0.75 + 0.5 * t) * (uEscala / -mv.z);
      gl_Position = projectionMatrix * mv;
    }
  `;

  function crearMaterial(vertexShader, tamBase, opacidad) {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTiempo: { value: 0 },
        uMapa: { value: TEX_PUNTO },
        uTam: { value: tamBase * PR },
        uEscala: { value: window.innerHeight * 0.5 },
        uOpac: { value: opacidad },
        uMezcla: { value: 0 }
      },
      vertexShader,
      fragmentShader: FRAGMENTO,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    materialesPuntos.push(mat);
    return mat;
  }

  /* =====================================================================
     4) ESTRELLAS DE FONDO
     ===================================================================== */

  (function crearEstrellas() {
    const pos = new Float32Array(NUM_ESTRELLAS * 3);
    const col = new Float32Array(NUM_ESTRELLAS * 3);
    const tam = new Float32Array(NUM_ESTRELLAS);
    const fase = new Float32Array(NUM_ESTRELLAS);
    const c = new THREE.Color();
    for (let i = 0; i < NUM_ESTRELLAS; i++) {
      const r = azar(130, 280);
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph) * 0.7;
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
      if (Math.random() > 0.85) c.setHSL(0.09, 0.9, 0.7);   // alguna cálida
      else c.setHSL(0.53 + Math.random() * 0.08, 0.5, 0.75);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      tam[i] = azar(0.5, 1.3);
      fase[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    geo.setAttribute("aTam", new THREE.BufferAttribute(tam, 1));
    geo.setAttribute("aFase", new THREE.BufferAttribute(fase, 1));
    const puntos = new THREE.Points(geo, crearMaterial(VERTICE_BASICO, 1.6, 0.9));
    puntos.frustumCulled = false;
    escena.add(puntos);
  })();

  /* =====================================================================
     5) GALAXIA: brazos en espiral, núcleo brillante y órbitas
     ===================================================================== */

  const galaxia = (function crearGalaxia() {
    const N = NUM_GALAXIA;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const tam = new Float32Array(N);
    const fase = new Float32Array(N);
    const c = new THREE.Color();
    const brazos = 3;
    for (let i = 0; i < N; i++) {
      const r = Math.pow(Math.random(), 0.6) * 46 + 2;
      const brazo = i % brazos;
      const ang = r * 0.15 + (brazo / brazos) * Math.PI * 2;
      const dispersion = 0.3 + r * 0.05;
      pos[i * 3] = Math.cos(ang) * r + gauss() * dispersion;
      pos[i * 3 + 1] = gauss() * (0.25 + r * 0.02);
      pos[i * 3 + 2] = Math.sin(ang) * r + gauss() * dispersion;
      const t = r / 48;
      if (Math.random() < 0.06) c.setHSL(0.07, 0.95, 0.6);           // chispas naranjas
      else if (t < 0.2) c.setHSL(0.5, 0.6, 0.78 - t);                 // núcleo casi blanco
      else if (t < 0.6) c.setHSL(0.51, 0.9, 0.55 - t * 0.15);         // cian
      else c.setHSL(0.58 + (t - 0.6) * 0.25, 0.8, 0.42);              // azul-violeta
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      tam[i] = azar(0.5, 1.5);
      fase[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    geo.setAttribute("aTam", new THREE.BufferAttribute(tam, 1));
    geo.setAttribute("aFase", new THREE.BufferAttribute(fase, 1));
    const puntos = new THREE.Points(geo, crearMaterial(VERTICE_BASICO, 0.34, 0.85));
    puntos.frustumCulled = false;
    plano.add(puntos);
    return puntos;
  })();

  // núcleo luminoso (halo cian + centro blanco)
  (function crearNucleo() {
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: TEX_HALO, color: 0x22d8ff, transparent: true, opacity: 0.55,
      depthWrite: false, blending: THREE.AdditiveBlending
    }));
    halo.scale.set(36, 36, 1);
    plano.add(halo);
    const centro = new THREE.Sprite(new THREE.SpriteMaterial({
      map: TEX_HALO, color: 0xe8ffff, transparent: true, opacity: 0.9,
      depthWrite: false, blending: THREE.AdditiveBlending
    }));
    centro.scale.set(10, 10, 1);
    plano.add(centro);
  })();

  // anillos de órbita finos, como las elipses del video
  [15, 23, 32, 42].forEach((r, i) => {
    const anillo = new THREE.Mesh(
      new THREE.RingGeometry(r, r + 0.07, 160),
      new THREE.MeshBasicMaterial({
        color: 0xbff8ff, transparent: true, opacity: 0.2 - i * 0.03,
        side: THREE.DoubleSide, depthWrite: false
      })
    );
    anillo.rotation.x = Math.PI / 2;
    plano.add(anillo);
  });

  /* =====================================================================
     6) FIGURA CENTRAL: carro de estrellas  <->  silueta de tu imagen
     ===================================================================== */

  // --- Capas de píxeles a partir de un canvas (para muestrear puntos) ---
  function capaDesdeCanvas(w, h, dibujar) {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const g = c.getContext("2d");
    dibujar(g);
    const datos = g.getImageData(0, 0, w, h).data;
    const idx = [];
    for (let i = 3; i < datos.length; i += 4) if (datos[i] > 110) idx.push((i - 3) >> 2);
    return { w, h, idx };
  }

  // --- FORMA A: un carro deportivo visto de lado, hecho de estrellas ---
  function capasCarroEstrellas() {
    const W = 640, H = 300;
    const contorno = new Path2D();
    contorno.moveTo(40, 226);
    contorno.bezierCurveTo(36, 205, 52, 190, 90, 184);
    contorno.lineTo(190, 172);
    contorno.bezierCurveTo(215, 140, 250, 118, 300, 112);
    contorno.lineTo(372, 112);
    contorno.bezierCurveTo(410, 114, 440, 140, 468, 168);
    contorno.lineTo(540, 182);
    contorno.bezierCurveTo(574, 190, 580, 210, 574, 226);
    contorno.closePath();

    const ruedas = [[170, 232], [440, 232]];

    const borde = capaDesdeCanvas(W, H, (g) => {
      g.lineWidth = 7; g.lineJoin = "round"; g.strokeStyle = "#fff";
      g.stroke(contorno);
      ruedas.forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 46, 0, Math.PI * 2); g.stroke(); });
      // alerón
      g.beginPath(); g.moveTo(52, 176); g.lineTo(118, 168); g.stroke();
      g.beginPath(); g.moveTo(66, 178); g.lineTo(66, 190); g.stroke();
    });

    const detalle = capaDesdeCanvas(W, H, (g) => {
      g.lineWidth = 6; g.lineJoin = "round"; g.lineCap = "round"; g.strokeStyle = "#fff";
      // ventanas
      g.beginPath();
      g.moveTo(222, 166); g.bezierCurveTo(240, 140, 268, 126, 305, 124);
      g.lineTo(368, 124); g.bezierCurveTo(396, 126, 418, 144, 440, 168); g.closePath();
      g.stroke();
      g.beginPath(); g.moveTo(336, 124); g.lineTo(336, 168); g.stroke();
      // franja de llamas
      g.beginPath();
      g.moveTo(96, 208); g.bezierCurveTo(190, 192, 320, 204, 470, 190);
      g.stroke();
      g.beginPath();
      g.moveTo(120, 218); g.bezierCurveTo(220, 208, 330, 216, 500, 206);
      g.stroke();
      // rayos de las ruedas
      ruedas.forEach(([x, y]) => {
        for (let k = 0; k < 6; k++) {
          const a = (k / 6) * Math.PI * 2;
          g.beginPath();
          g.moveTo(x + Math.cos(a) * 8, y + Math.sin(a) * 8);
          g.lineTo(x + Math.cos(a) * 30, y + Math.sin(a) * 30);
          g.stroke();
        }
        g.beginPath(); g.arc(x, y, 28, 0, Math.PI * 2); g.stroke();
      });
      // faro
      g.beginPath(); g.arc(552, 200, 6, 0, Math.PI * 2); g.stroke();
    });

    const relleno = capaDesdeCanvas(W, H, (g) => {
      g.fillStyle = "#fff";
      g.fill(contorno);
    });

    return { capas: [borde, detalle, relleno], pesos: [0.5, 0.34, 0.16] };
  }

  // --- FORMA B: la silueta de la imagen enviada ---
  function decodificarBits(b64, w, h) {
    const bin = atob(b64);
    const out = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) out[i] = (bin.charCodeAt(i >> 3) >> (7 - (i & 7))) & 1;
    return out;
  }

  function capasSilueta() {
    const { w, h } = SILUETA;
    const mascara = decodificarBits(SILUETA.mascara, w, h);
    const detalles = decodificarBits(SILUETA.detalles, w, h);
    const borde = [], interior = [], lineas = [];
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        if (!mascara[i]) continue;
        const arriba = y > 0 ? mascara[i - w] : 0;
        const abajo = y < h - 1 ? mascara[i + w] : 0;
        const izq = x > 0 ? mascara[i - 1] : 0;
        const der = x < w - 1 ? mascara[i + 1] : 0;
        if (!arriba || !abajo || !izq || !der) borde.push(i);
        else interior.push(i);
        if (detalles[i]) lineas.push(i);
      }
    }
    return {
      capas: [{ w, h, idx: borde }, { w, h, idx: lineas }, { w, h, idx: interior }],
      pesos: [0.36, 0.44, 0.20]
    };
  }

  // Colores de la silueta tomados de la imagen original (paleta de 48 columnas)
  function colorSilueta(px, py) {
    const bin = atob(SILUETA.colores);
    const cx = Math.min(SILUETA.cw - 1, Math.floor((px / SILUETA.w) * SILUETA.cw));
    const cy = Math.min(SILUETA.ch - 1, Math.floor((py / SILUETA.h) * SILUETA.ch));
    const o = (cy * SILUETA.cw + cx) * 3;
    return [bin.charCodeAt(o) / 255, bin.charCodeAt(o + 1) / 255, bin.charCodeAt(o + 2) / 255];
  }

  // Elige puntos al azar sobre las capas y los lleva a coordenadas 3D centradas
  function muestrear(def, n, tamObjetivo) {
    let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    def.capas.forEach((capa) => {
      capa.idx.forEach((i) => {
        const x = i % capa.w, y = (i / capa.w) | 0;
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      });
    });
    const escala = tamObjetivo / Math.max(maxX - minX, maxY - minY);
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    const pos = new Float32Array(n * 3);
    const capaDe = new Uint8Array(n);
    const pixel = new Float32Array(n * 2);
    const acumulado = [];
    let suma = 0;
    def.pesos.forEach((p) => { suma += p; acumulado.push(suma); });
    for (let i = 0; i < n; i++) {
      const r = Math.random() * suma;
      let k = 0;
      while (k < acumulado.length - 1 && r > acumulado[k]) k++;
      const capa = def.capas[k];
      const idx = capa.idx[(Math.random() * capa.idx.length) | 0];
      const px = (idx % capa.w) + Math.random() - 0.5;
      const py = ((idx / capa.w) | 0) + Math.random() - 0.5;
      pos[i * 3] = (px - cx) * escala;
      pos[i * 3 + 1] = -(py - cy) * escala;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.0;
      capaDe[i] = k;
      pixel[i * 2] = px; pixel[i * 2 + 1] = py;
    }
    return { pos, capaDe, pixel };
  }

  const N_FIG = NUM_PARTICULAS_FIGURA;
  const figA = muestrear(capasCarroEstrellas(), N_FIG, 27);
  const figB = muestrear(capasSilueta(), N_FIG, 20);

  // Colores: el carro usa cian/blanco en el contorno, naranja y amarillo en llamas y relleno.
  // La silueta usa los colores reales de la imagen, con un toque de brillo.
  const colA = new Float32Array(N_FIG * 3);
  const colB = new Float32Array(N_FIG * 3);
  const tmp = new THREE.Color();
  for (let i = 0; i < N_FIG; i++) {
    const capa = figA.capaDe[i];
    if (capa === 0) tmp.setHSL(0.5, 0.85, azar(0.62, 0.9));            // contorno cian-blanco
    else if (capa === 1) tmp.setHSL(azar(0.08, 0.14), 1, azar(0.55, 0.7)); // llamas amarillo-naranja
    else tmp.setHSL(azar(0.0, 0.03), 0.95, azar(0.5, 0.62));           // relleno rojo Hot Wheels
    colA[i * 3] = tmp.r; colA[i * 3 + 1] = tmp.g; colA[i * 3 + 2] = tmp.b;

    const [r, g, b] = colorSilueta(figB.pixel[i * 2], figB.pixel[i * 2 + 1]);
    // mezcla ligera con blanco cian para que brille como estrella
    colB[i * 3] = Math.min(1, r * 0.85 + 0.2);
    colB[i * 3 + 1] = Math.min(1, g * 0.85 + 0.25);
    colB[i * 3 + 2] = Math.min(1, b * 0.85 + 0.3);
  }

  const tamFig = new Float32Array(N_FIG);
  const faseFig = new Float32Array(N_FIG);
  for (let i = 0; i < N_FIG; i++) { tamFig[i] = azar(0.6, 1.5); faseFig[i] = Math.random(); }

  const geoFig = new THREE.BufferGeometry();
  geoFig.setAttribute("position", new THREE.BufferAttribute(figA.pos, 3));
  geoFig.setAttribute("aPosB", new THREE.BufferAttribute(figB.pos, 3));
  geoFig.setAttribute("aColor", new THREE.BufferAttribute(colA, 3));
  geoFig.setAttribute("aColorB", new THREE.BufferAttribute(colB, 3));
  geoFig.setAttribute("aTam", new THREE.BufferAttribute(tamFig, 1));
  geoFig.setAttribute("aFase", new THREE.BufferAttribute(faseFig, 1));

  const matFigura = crearMaterial(VERTICE_FIGURA, 0.3, 1.0);
  const figura = new THREE.Points(geoFig, matFigura);
  figura.frustumCulled = false;
  const grupoFigura = new THREE.Group();
  grupoFigura.position.set(0, 17, 0);
  grupoFigura.add(figura);
  escena.add(grupoFigura);

  // halo suave detrás de la figura
  const haloFigura = new THREE.Sprite(new THREE.SpriteMaterial({
    map: TEX_HALO, color: 0x1ab8d8, transparent: true, opacity: 0.22,
    depthWrite: false, blending: THREE.AdditiveBlending
  }));
  haloFigura.scale.set(34, 34, 1);
  haloFigura.position.z = -1;
  grupoFigura.add(haloFigura);

  let mezcla = 0;      // 0 = carro, 1 = silueta
  let destinoMezcla = 0;
  function alternarFigura() { destinoMezcla = destinoMezcla === 0 ? 1 : 0; }

  /* =====================================================================
     7) CARRITOS DIBUJADOS (estilo juguete de colección)
     ===================================================================== */

  function mezclarColor(hex, t) {
    const n = parseInt(hex.slice(1), 16);
    let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    const k = Math.abs(t), to = t > 0 ? 255 : 0;
    r = Math.round(r + (to - r) * k);
    g = Math.round(g + (to - g) * k);
    b = Math.round(b + (to - b) * k);
    return `rgb(${r},${g},${b})`;
  }

  const COLORES_CARRO = [
    { hex: "#e10600", calido: true },  { hex: "#ffcc00", calido: true },
    { hex: "#ff7a00", calido: true },  { hex: "#1e90ff", calido: false },
    { hex: "#2ecc71", calido: false }, { hex: "#f2f2f2", calido: true },
    { hex: "#8e44ad", calido: false }, { hex: "#00c2d1", calido: false },
    { hex: "#ff2d95", calido: false }
  ];

  function dibujarCarro(variante, color, espejo) {
    const W = 320, H = 170, suelo = 136;
    const c = document.createElement("canvas");
    c.width = W; c.height = H;
    const g = c.getContext("2d");
    if (espejo) { g.translate(W, 0); g.scale(-1, 1); }

    // sombra en el piso
    g.fillStyle = "rgba(0,0,0,0.38)";
    g.beginPath(); g.ellipse(164, suelo + 27, 122, 6, 0, 0, Math.PI * 2); g.fill();

    // carrocería
    const cuerpo = new Path2D();
    if (variante === 0) {          // deportivo bajo
      cuerpo.moveTo(22, suelo + 4);
      cuerpo.quadraticCurveTo(16, suelo - 20, 38, suelo - 30);
      cuerpo.lineTo(90, suelo - 38);
      cuerpo.quadraticCurveTo(116, suelo - 76, 158, suelo - 82);
      cuerpo.lineTo(198, suelo - 82);
      cuerpo.quadraticCurveTo(230, suelo - 78, 248, suelo - 46);
      cuerpo.lineTo(290, suelo - 36);
      cuerpo.quadraticCurveTo(310, suelo - 28, 306, suelo + 4);
    } else if (variante === 1) {   // compacto cuadrado
      cuerpo.moveTo(22, suelo + 4);
      cuerpo.lineTo(22, suelo - 30);
      cuerpo.quadraticCurveTo(24, suelo - 40, 44, suelo - 42);
      cuerpo.lineTo(84, suelo - 44);
      cuerpo.lineTo(104, suelo - 80);
      cuerpo.lineTo(206, suelo - 80);
      cuerpo.lineTo(234, suelo - 46);
      cuerpo.lineTo(286, suelo - 42);
      cuerpo.quadraticCurveTo(308, suelo - 36, 306, suelo + 4);
    } else {                       // pickup
      cuerpo.moveTo(22, suelo + 4);
      cuerpo.lineTo(22, suelo - 46);
      cuerpo.lineTo(122, suelo - 46);
      cuerpo.lineTo(130, suelo - 48);
      cuerpo.lineTo(152, suelo - 82);
      cuerpo.lineTo(216, suelo - 82);
      cuerpo.quadraticCurveTo(234, suelo - 80, 244, suelo - 48);
      cuerpo.lineTo(288, suelo - 42);
      cuerpo.quadraticCurveTo(308, suelo - 36, 306, suelo + 4);
    }
    cuerpo.closePath();

    const gr = g.createLinearGradient(0, suelo - 84, 0, suelo + 6);
    gr.addColorStop(0, mezclarColor(color.hex, 0.4));
    gr.addColorStop(0.45, color.hex);
    gr.addColorStop(1, mezclarColor(color.hex, -0.45));
    g.fillStyle = gr;
    g.fill(cuerpo);

    // detalles dentro de la carrocería
    g.save();
    g.clip(cuerpo);
    // franja de llamas (contrasta según el color del carro)
    const franja = g.createLinearGradient(30, 0, 306, 0);
    if (color.calido) {
      franja.addColorStop(0, "#ffffff"); franja.addColorStop(1, "#22d8ff");
    } else {
      franja.addColorStop(0, "#ffe14d"); franja.addColorStop(0.6, "#ff9a1a"); franja.addColorStop(1, "#ff3b1a");
    }
    g.fillStyle = franja;
    g.beginPath();
    g.moveTo(20, suelo - 6);
    g.bezierCurveTo(80, suelo - 32, 150, suelo - 8, 200, suelo - 24);
    g.bezierCurveTo(240, suelo - 36, 270, suelo - 22, 310, suelo - 32);
    g.lineTo(310, suelo - 12);
    g.bezierCurveTo(268, suelo - 6, 236, suelo - 16, 196, suelo - 6);
    g.bezierCurveTo(140, suelo + 6, 70, suelo + 2, 20, suelo - 6);
    g.fill();
    // brillo en el hombro del carro
    g.strokeStyle = "rgba(255,255,255,0.35)";
    g.lineWidth = 3;
    g.beginPath(); g.moveTo(40, suelo - 36); g.lineTo(290, suelo - 42); g.stroke();
    // huecos de las ruedas
    g.fillStyle = "#0a0a0a";
    [86, 238].forEach((x) => { g.beginPath(); g.arc(x, suelo + 4, 29, 0, Math.PI * 2); g.fill(); });
    g.restore();

    g.lineWidth = 3; g.lineJoin = "round"; g.strokeStyle = "rgba(0,0,0,0.8)";
    g.stroke(cuerpo);

    // ventanas
    const vent = new Path2D();
    let pilar;
    if (variante === 0) {
      vent.moveTo(106, suelo - 40); vent.quadraticCurveTo(126, suelo - 72, 160, suelo - 76);
      vent.lineTo(196, suelo - 76); vent.quadraticCurveTo(220, suelo - 72, 238, suelo - 46);
      pilar = [174, suelo - 76, 176, suelo - 44];
    } else if (variante === 1) {
      vent.moveTo(96, suelo - 46); vent.lineTo(110, suelo - 74); vent.lineTo(202, suelo - 74); vent.lineTo(224, suelo - 48);
      pilar = [158, suelo - 74, 160, suelo - 46];
    } else {
      vent.moveTo(140, suelo - 50); vent.lineTo(156, suelo - 76); vent.lineTo(210, suelo - 76); vent.lineTo(230, suelo - 50);
      pilar = [184, suelo - 76, 186, suelo - 48];
    }
    vent.closePath();
    const gv = g.createLinearGradient(0, suelo - 80, 0, suelo - 40);
    gv.addColorStop(0, "#a8e6ff"); gv.addColorStop(1, "#0d2a3c");
    g.fillStyle = gv; g.fill(vent);
    g.strokeStyle = "rgba(0,0,0,0.75)"; g.lineWidth = 2.5; g.stroke(vent);
    g.beginPath(); g.moveTo(pilar[0], pilar[1]); g.lineTo(pilar[2], pilar[3]); g.stroke();

    if (variante === 2) {          // caja de la pickup
      g.fillStyle = "rgba(0,0,0,0.35)";
      g.fillRect(28, suelo - 44, 90, 12);
    }
    if (variante === 0) {          // alerón
      g.fillStyle = mezclarColor(color.hex, -0.35);
      g.fillRect(20, suelo - 48, 30, 6);
      g.fillRect(28, suelo - 44, 4, 12);
      g.strokeStyle = "rgba(0,0,0,0.7)"; g.lineWidth = 2; g.strokeRect(20, suelo - 48, 30, 6);
    }

    // ruedas
    [86, 238].forEach((x) => {
      const y = suelo + 4;
      g.fillStyle = "#0b0b0b";
      g.beginPath(); g.arc(x, y, 23, 0, Math.PI * 2); g.fill();
      const gm = g.createRadialGradient(x - 3, y - 3, 1, x, y, 14);
      gm.addColorStop(0, "#ffffff"); gm.addColorStop(1, "#8a9299");
      g.fillStyle = gm;
      g.beginPath(); g.arc(x, y, 14, 0, Math.PI * 2); g.fill();
      g.strokeStyle = "#2a2f33"; g.lineWidth = 2;
      for (let k = 0; k < 5; k++) {
        const a = (k / 5) * Math.PI * 2 + 0.3;
        g.beginPath(); g.moveTo(x + Math.cos(a) * 3, y + Math.sin(a) * 3);
        g.lineTo(x + Math.cos(a) * 13, y + Math.sin(a) * 13); g.stroke();
      }
      g.fillStyle = "#333"; g.beginPath(); g.arc(x, y, 3, 0, Math.PI * 2); g.fill();
    });

    // luces
    g.fillStyle = "#fff6b0";
    g.beginPath(); g.ellipse(299, suelo - 22, 6, 4, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = "#ff2a1a";
    g.fillRect(21, suelo - 30, 5, 9);

    return c;
  }

  // Sprites de carritos: se generan unas cuantas texturas y se reparten entre todos
  const carros = [];
  const spritesCarros = [];
  const texturasCarro = [];
  for (let i = 0; i < 14; i++) {
    const cv = dibujarCarro(i % 3, COLORES_CARRO[i % COLORES_CARRO.length], Math.random() > 0.5);
    const tex = new THREE.CanvasTexture(cv);
    tex.anisotropy = 4;
    texturasCarro.push({ tex, url: cv.toDataURL("image/png"), relacion: cv.width / cv.height });
  }

  function agregarCarro(textura, url, relacion, ancho) {
    const mat = new THREE.SpriteMaterial({ map: textura, transparent: true, depthWrite: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(ancho, ancho / relacion, 1);
    const radio = azar(14, 47);
    const datos = {
      sprite, url, radio,
      ang: Math.random() * Math.PI * 2,
      vel: (0.55 + Math.random() * 0.5) / Math.pow(radio, 0.85),
      altura: azar(-9, 9),
      fase: Math.random() * Math.PI * 2
    };
    sprite.userData = datos;
    plano.add(sprite);
    carros.push(datos);
    spritesCarros.push(sprite);
  }

  for (let i = 0; i < NUM_CARROS; i++) {
    const t = texturasCarro[i % texturasCarro.length];
    agregarCarro(t.tex, t.url, t.relacion, azar(5.6, 9.2));
  }

  // Fotos reales opcionales
  FOTOS_CARROS.forEach((ruta) => {
    new THREE.TextureLoader().load(ruta, (tex) => {
      const rel = tex.image.width / tex.image.height;
      agregarCarro(tex, ruta, rel, 8.5);
    }, undefined, () => { /* si no existe, la ignoramos */ });
  });

  /* =====================================================================
     8) PALABRAS CORTAS ORBITANDO
     ===================================================================== */

  const palabras = [];

  function texturaTexto(texto, colorTexto, colorBrillo) {
    const fuente = "500 34px Fredoka, sans-serif";
    const medida = document.createElement("canvas").getContext("2d");
    medida.font = fuente;
    const ancho = Math.ceil(medida.measureText(texto).width) + 44;
    const alto = 64;
    const c = document.createElement("canvas");
    c.width = ancho; c.height = alto;
    const g = c.getContext("2d");
    g.font = fuente;
    g.textAlign = "center"; g.textBaseline = "middle";
    g.shadowColor = colorBrillo; g.shadowBlur = 16;
    g.fillStyle = colorTexto;
    g.fillText(texto, ancho / 2, alto / 2);
    g.shadowBlur = 6;
    g.fillText(texto, ancho / 2, alto / 2);
    const t = new THREE.CanvasTexture(c);
    t.minFilter = THREE.LinearFilter;
    return { textura: t, relacion: ancho / alto };
  }

  function crearPalabras() {
    PALABRAS.forEach((texto, i) => {
      const calida = i % 5 === 3;
      const { textura, relacion } = texturaTexto(
        texto,
        calida ? "#ffe9a8" : "#d9fcff",
        calida ? "rgba(255,150,30,0.9)" : "rgba(34,229,255,0.95)"
      );
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: textura, transparent: true, depthWrite: false,
        opacity: 0.8, blending: THREE.AdditiveBlending
      }));
      const alto = 1.7;
      sprite.scale.set(alto * relacion, alto, 1);
      const radio = 17 + (i % 4) * 8 + azar(0, 4);
      palabras.push({
        sprite, radio,
        ang: (i / PALABRAS.length) * Math.PI * 2,
        vel: (0.45 + Math.random() * 0.3) / Math.pow(radio, 0.85),
        altura: azar(-10, 10),
        fase: Math.random() * Math.PI * 2
      });
      plano.add(sprite);
    });
  }

  // esperamos a la tipografía para que las palabras se dibujen con Fredoka
  const esperaFuente = document.fonts && document.fonts.load
    ? Promise.race([document.fonts.load("500 34px Fredoka"), new Promise((r) => setTimeout(r, 1800))])
    : Promise.resolve();
  esperaFuente.then(crearPalabras, crearPalabras);

  /* =====================================================================
     9) CÁMARA E INTERACCIÓN
     ===================================================================== */

  let anguloCamara = 0.4;
  let alturaCamara = 15;
  let distancia = 54;
  let velocidadGiro = 0.0012;
  const GIRO_BASE = 0.0012;
  let arrastrando = false;
  let movido = 0;
  let inicioToque = 0;
  let distPinza = 0;
  const punteros = new Map();

  function distanciaPunteros() {
    const v = Array.from(punteros.values());
    return Math.hypot(v[0].x - v[1].x, v[0].y - v[1].y);
  }

  canvas.addEventListener("pointerdown", (e) => {
    try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ok */ }
    punteros.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (punteros.size === 1) { movido = 0; inicioToque = performance.now(); arrastrando = true; }
    else if (punteros.size === 2) { distPinza = distanciaPunteros(); }
  });

  canvas.addEventListener("pointermove", (e) => {
    const p = punteros.get(e.pointerId);
    if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY;
    if (punteros.size === 1) {
      movido += Math.abs(dx) + Math.abs(dy);
      anguloCamara -= dx * 0.005;
      alturaCamara = limitar(alturaCamara + dy * 0.08, -4, 46);
      velocidadGiro = -dx * 0.0003;
    } else if (punteros.size === 2) {
      const d = distanciaPunteros();
      distancia = limitar(distancia - (d - distPinza) * 0.12, 22, 110);
      distPinza = d;
      movido += 12;
    }
  });

  function soltar(e) {
    const estaba = punteros.has(e.pointerId);
    punteros.delete(e.pointerId);
    if (estaba && punteros.size === 0) {
      arrastrando = false;
      if (movido < 10 && performance.now() - inicioToque < 450) tocar(e.clientX, e.clientY);
    }
  }
  canvas.addEventListener("pointerup", soltar);
  canvas.addEventListener("pointercancel", soltar);

  canvas.addEventListener("wheel", (e) => {
    distancia = limitar(distancia + e.deltaY * 0.05, 22, 110);
    e.preventDefault();
  }, { passive: false });

  /* --- Tocar un carrito --- */
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();

  function tocar(x, y) {
    if (!iniciado) return;
    ndc.x = (x / window.innerWidth) * 2 - 1;
    ndc.y = -(y / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(ndc, camara);
    const choques = raycaster.intersectObjects(spritesCarros, false);
    if (choques.length > 0) abrirTarjeta(choques[0].object.userData);
  }

  const capaTarjeta = document.getElementById("capa-tarjeta");
  const tarjetaImg = document.getElementById("tarjeta-img");
  const tarjetaTexto = document.getElementById("tarjeta-texto");
  let ultimoMensaje = -1;

  function abrirTarjeta(datos) {
    let k;
    do { k = (Math.random() * MENSAJES.length) | 0; } while (k === ultimoMensaje && MENSAJES.length > 1);
    ultimoMensaje = k;
    tarjetaImg.src = datos.url;
    tarjetaTexto.textContent = MENSAJES[k];
    capaTarjeta.classList.remove("oculto");
  }

  function cerrarTarjeta() { capaTarjeta.classList.add("oculto"); }
  document.getElementById("cerrar-tarjeta").addEventListener("click", cerrarTarjeta);
  capaTarjeta.addEventListener("click", (e) => { if (e.target === capaTarjeta) cerrarTarjeta(); });

  /* =====================================================================
     10) INICIO Y MÚSICA
     ===================================================================== */

  const pantallaInicio = document.getElementById("inicio");
  const reloj = new THREE.Clock();
  let iniciado = false;
  let tInicio = 0;

  const audio = document.getElementById("audio-fondo");
  const btnAudio = document.getElementById("btn-audio");
  const icPlay = document.getElementById("ic-play");
  const icPausa = document.getElementById("ic-pausa");
  let sonando = false;

  function marcarSonando(valor) {
    sonando = valor;
    icPlay.classList.toggle("oculto", valor);
    icPausa.classList.toggle("oculto", !valor);
  }

  function intentarMusica() {
    audio.play().then(() => marcarSonando(true)).catch(() => { /* sin archivo de música: no pasa nada */ });
  }

  function iniciar() {
    if (iniciado) return;
    iniciado = true;
    tInicio = reloj.getElapsedTime();
    pantallaInicio.classList.add("saliendo");
    setTimeout(() => pantallaInicio.remove(), 1000);
    intentarMusica();
  }
  pantallaInicio.addEventListener("click", iniciar);
  pantallaInicio.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") iniciar(); });

  btnAudio.addEventListener("click", () => {
    if (!sonando) intentarMusica();
    else { audio.pause(); marcarSonando(false); }
  });

  document.getElementById("btn-forma").addEventListener("click", alternarFigura);
  setInterval(() => { if (iniciado && capaTarjeta.classList.contains("oculto")) alternarFigura(); }, INTERVALO_MUTACION_MS);

  /* =====================================================================
     11) BUCLE DE ANIMACIÓN
     ===================================================================== */

  function suave(x) { return x * x * (3 - 2 * x); }

  function animar() {
    requestAnimationFrame(animar);
    const dt = Math.min(reloj.getDelta(), 0.05);
    const t = reloj.getElapsedTime();

    materialesPuntos.forEach((m) => { m.uniforms.uTiempo.value = t; });

    // entrada de cámara: se acerca desde lejos al tocar para iniciar
    let intro = 1;
    if (iniciado) intro = 1 - suave(limitar((t - tInicio) / 4.2, 0, 1));
    const distanciaFinal = distancia + intro * 80;

    if (!arrastrando) velocidadGiro += (GIRO_BASE - velocidadGiro) * 0.02;
    anguloCamara += velocidadGiro * (arrastrando ? 0 : 1);
    camara.position.set(
      Math.sin(anguloCamara) * distanciaFinal,
      alturaCamara + intro * 10,
      Math.cos(anguloCamara) * distanciaFinal
    );
    camara.lookAt(0, 9, 0);

    // la galaxia gira despacio
    galaxia.rotation.y += dt * 0.035;

    // figura central: mutación y siempre mirando de frente a la cámara
    mezcla += (destinoMezcla - mezcla) * Math.min(1, dt * 1.25);
    matFigura.uniforms.uMezcla.value = mezcla;
    grupoFigura.rotation.y = Math.atan2(camara.position.x, camara.position.z);
    grupoFigura.position.y = 17 + Math.sin(t * 0.6) * 0.5;

    // carritos orbitando
    carros.forEach((c) => {
      c.ang += c.vel * dt * 6;
      c.sprite.position.set(
        Math.cos(c.ang) * c.radio,
        c.altura + Math.sin(t * 0.7 + c.fase) * 0.9,
        Math.sin(c.ang) * c.radio
      );
      c.sprite.material.rotation = Math.sin(t * 0.8 + c.fase) * 0.07;
    });

    // palabras orbitando
    palabras.forEach((p) => {
      p.ang += p.vel * dt * 5;
      p.sprite.position.set(
        Math.cos(p.ang) * p.radio,
        p.altura + Math.sin(t * 0.5 + p.fase) * 1.0,
        Math.sin(p.ang) * p.radio
      );
      p.sprite.material.opacity = 0.55 + Math.sin(t * 0.9 + p.fase) * 0.25;
    });

    renderer.render(escena, camara);
  }

  animar();

  window.addEventListener("resize", () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    materialesPuntos.forEach((m) => { m.uniforms.uEscala.value = window.innerHeight * 0.5; });
  });

})();
