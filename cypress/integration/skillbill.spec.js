import { tableCell } from './cyhelper'

for (let i = 0; i < 1 ; i++) {

  describe('I. Documents filtering', () => {
    it('1. .. using JS=4, Java=2 and C without rank specified, should get at least 3 devs' +
      'and pressing Clear button should clear all the select boxes', () => {

      cy.visit('http://localhost:8080')

      .get("[data-test='filter_skill_1']").click({ force: true })
      cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(4) > a > div > div").click()

      .get("[data-test='filter_rank_1']").eq(0).click({ force: true })
      cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(2) > a > div > div").click()

      .get("[data-test='filter_skill2']").click({ force: true })
      cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(4) > a > div > div").click()

      .get("[data-test='filter_rank_2']").click({ force: true })
      cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(4) > a > div > div").click()

      .get("[data-test='filter_skill_3']").click({ force: true })
      cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(1) > a > div > div").click()

      .get("[data-test='filter_rank_3']").click({ force: true })
      cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(5) > a > div > div").click()

      .get("[data-test='btnSearch']").click().wait(2000)
//cy.pause()

      cy.get(tableCell(1, 5)).should('contain', 'JS')
      cy.get(tableCell(1, 6)).contains(/[4,5]/).should('exist')

      cy.get(tableCell(1, 7)).should('contain', 'Java')
      cy.get(tableCell(1, 8)).contains(/[3,4,5]/).should('exist')

      cy.get(tableCell(1, 9)).should('contain', 'C')
      cy.get(tableCell(1, 10)).contains(/[1,2,3,4,5]/).should('exist')

      cy.get(tableCell(2, 5)).should('contain', 'JS')
      cy.get(tableCell(2, 6)).contains(/[4,5]/).should('exist')

      cy.get(tableCell(2, 7)).should('contain', 'Java')
      cy.get(tableCell(2, 8)).contains(/[2,3,4,5]/).should('exist')

      cy.get(tableCell(2, 9)).should('contain', 'C')
      cy.get(tableCell(2, 10)).contains(/[1,2,3,4,5]/).should('exist')

      cy.get("[data-test='btnClear']").click().wait(1000)
      cy.get("[data-test='skill1']").should('contain', '')
      cy.get("[data-test='skill2']").should('contain', '')
      cy.get("[data-test='skill3']").should('contain', '')

      cy.get("[data-test='rank1']").should('contain', '')
      cy.get("[data-test='rank2']").should('contain', '')
      cy.get("[data-test='rank3']").should('contain', '')

      cy.scrollTo(0, 0)
    })
  })

  describe('II. Inserting and deleteing a dev', () => {
    it('1. .. should immediately add him to the view (JS=5, Java=5, C=5) and followig click \
      on "Delete" icon should immediately remove him, from the view', () => {
      cy.visit('http://localhost:8080').wait(2000)

      cy.get("[data-test='btnNewDev']").click({ force: true })
      cy.get("[data-test='first']").type('Hans')
      cy.get("[data-test='last']").type('Klops')

      cy.get('#app > div:nth-child(11) > div > div > div:nth-child(1) > a > div > div').click({ force: true})
      cy.get('#app > div:nth-child(10) > div > div > div:nth-child(4) > a > div > div').click({ force: true})
      cy.get('#app > div:nth-child(9) > div > div > div:nth-child(1) > a > div > div').click({ force: true})
      cy.get('#app > div:nth-child(8) > div > div > div:nth-child(5) > a > div > div').click({ force: true})
      cy.get('#app > div:nth-child(7) > div > div > div:nth-child(1) > a > div > div').click({ force: true})
      cy.get('#app > div:nth-child(6) > div > div > div:nth-child(1) > a > div > div').click({ force: true})

      cy.get('#app > div:nth-child(5) > div > div > div:nth-child(1) > a > div > div').click({ force: true})
      cy.get("[data-test='btnSave']").click({ force: true }).wait(2000)
      cy.get("[data-test='find']").type('klops')
      cy.get("[data-test='btnFind']").click().wait(2000)

      cy.get(tableCell(1, 2)).contains('Consultant').should('exist')
      cy.get(tableCell(1, 3)).contains('Hans').should('exist')
      cy.get(tableCell(1, 4)).contains('Klops').should('exist')

      cy.get("tr:nth-child(1) > td.justify-center.layout.px-0 > i:nth-child(3)").click().wait(2000)

      cy.get(tableCell(1, 2)).contains('Consultant').should('not.exist')
      cy.get(tableCell(1, 3)).contains('Hans').should('not.exist')
      cy.get(tableCell(1, 4)).contains('Klops').should('not.exist')
    })
  })

  describe('III. Editing a dev', () => {
    it('1. .. should immediately show modified data of a dev', () => {
      cy.visit('http://localhost:8080').wait(2000)
      cy.get('tr:nth-child(1)').find('[data-test="edit"]').click()

      cy.get("[data-test='first']").clear().type('Miś')
      cy.get("[data-test='last']").clear().type('Uszatek')

      cy.get('#app > div:nth-child(10) > div > div > div:nth-child(5) > a > div > div').click({ force: true})  // Architect

      cy.get("[data-test='email']").clear().type('Mis@Uszatek.pl')
      cy.get("[data-test='btnSave']").click({ force: true })
      cy.get("[data-test='find']").type('Uszatek')
      cy.get("[data-test='btnFind']").click()

      cy.get(tableCell(1, 2)).contains('Architect').should('exist')
      cy.get(tableCell(1, 3)).contains('Miś').should('exist')
      cy.get(tableCell(1, 4)).contains('Uszatek').should('exist')
      cy.get('tr:nth-child(1)').find('[data-test="edit"]').click()

      cy.get("[data-test='first']").clear().type('Betty')
      cy.get("[data-test='last']").clear().type('Loo')
      cy.get('#app > div:nth-child(10) > div > div > div:nth-child(3) > a > div > div').click({ force: true})  // Architect
      cy.get("[data-test='email']").clear().type('betty.loo@gmail.com')
      cy.get("[data-test='btnSave']").click({ force: true })
      cy.get("[data-test='btnSearch']").click({ force: true })
    })
  })

  describe('IV. Selected devs', () => {
    it('1. .. should be visible after being doubleclicked and button Selected was clicked. \
      After clicking Reset butto, previous table id shown', () => {

      cy.visit('http://localhost:8080').wait(2000)

      cy.contains('Loo').dblclick()
      cy.contains('Maty').dblclick()
      cy.contains('Cuffin').dblclick()

      cy.get("[data-test='btnSelected']").click()

      cy.contains('Loo').should('exist')
      cy.contains('Maty').should('exist')
      cy.contains('Cuffin').should('exist')

      cy.get("[data-test='btnReset']").click().wait(1000)
      cy.get('table > tbody > tr').its('length').should('be.gte', 10)
    })
  })
}

