module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bcprimary: '#223D60',
        bcsecondary: '#212429',

        fcprimary : '#FFFFFF',
        fcsecondary : '#D1D1D1',

        bgcdark:'#191B1F',
        bgcgray:'#212429',

        innerborder1:'#424242',
        innerborder2:'#7A7A7A',

        secondary: {
         
        }
      },
      fontFamily: {
        body: ['Roboto']
      },
      fontSize: {
        title: ['15px', '18px'],
        subtitle: ['12.5px', '15px'],
        intxt: ['15px', '21px'],
      }
    },
  },
  variants: {
    extend: {
      
    },
  },
  plugins: [],
}
