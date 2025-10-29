import { Component, signal, effect } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { INCOME_CATEGORIES } from '../../data/income-categories.data';
import { EXPENSE_CATEGORIES } from '../../data/expense-categories.data';
import { CdkMenu, CdkMenuItem, CdkMenuBar, } from '@angular/cdk/menu';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { Category } from '../../models/category.model';
import { Subcategory } from '../../models/subcategory.model';
import { FormsModule, FormControl, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms'
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../models/transaction.model';
import { OverlayService } from '../../services/overlay.service';


@Component({
  selector: 'app-transaction-editor',
  standalone: true,
  imports: [CurrencyPipe, CdkMenu, CdkMenuItem, CdkMenuBar, MatGridListModule, CommonModule, ReactiveFormsModule, FormsModule, TextFieldModule],
  providers: [CurrencyPipe],
  templateUrl: './transaction-editor.component.html',
  styleUrl: './transaction-editor.component.scss'
})

export class TransactionEditorComponent {
  transactionForm!: FormGroup;
  editing = false;

  /** Transaction Type Tab Handlers */
  public transactionType = signal<'Income' | 'Expense' | null>(null);
  
  isIncomeTabOpen = signal(true);
  isExpenseTabOpen = signal(false);


  /** Variables & Object Declarations */
  expenseCategories: Category[] = EXPENSE_CATEGORIES;
  incomeCategories: Category[] = INCOME_CATEGORIES;

  selectedCategory!: Category;
  selectedSubcategory!: Subcategory;
  amountControl = new FormControl('');
  amount: number = 0;
  date: string = '';
  description: string = '';

  /** Init */
  ngOnInit() {
    const txType = this.txs.getTransactionType();

    this.transactionForm = this.fb.group({
      transactionType: [txType],
      category: [null],
      subCategory: [null],
      amount: [''],
      date: [''],
      description: ['']
    });

    this.transactionType.set(txType);

    if (this.transactionType() === 'Expense') {
      this.toggleExpenseTab();
    } else {
      this.toggleIncomeTab();
    }
  }

  /** Constructor */
  constructor(
    private fb: FormBuilder,
    private txs: TransactionsService,
    private ovserv: OverlayService,
    private currencyPipe: CurrencyPipe) {}
  
  effect = effect(() => {
    const tx = this.txs.getSelectedTransaction();

    if (tx) {
      this.editing = true;

      // find Category object by name
      const categoryObj = [...this.expenseCategories, ...this.incomeCategories]
        .find(c => c.name === tx.category);

      // find Subcategory object by name
      const subCategoryObj = categoryObj?.subcategories
        .find(sc => sc.name === tx.subCategory);

      this.transactionForm.patchValue({
        category: categoryObj,
        subCategory: subCategoryObj,
        amount: tx.amount,
        date: tx.date,
        description: tx.description,
      });

      if (categoryObj) this.selectCategory(categoryObj);
      if (subCategoryObj) this.selectSubcategory(subCategoryObj);

    } else {
      this.editing = false;
      this.transactionForm.patchValue({
        category: this.selectedCategory.name,
        subCategory: this.selectedSubcategory.name,
        amount: this.currencyPipe.transform(this.amount, 'USD', 'symbol', '1.2-2'),
        date: this.date,
        description: this.description,
      });
    }
  });

  closeSelf() {
    this.ovserv.close();
    this.txs.setSelectedTransaction(null);
    this.txs.setTransactionType(null);
  }

  /** Category Menu Tab Handlers */
  toggleIncomeTab() {
    this.transactionType.set('Income');
    this.isExpenseTabOpen.set(false);
    this.isIncomeTabOpen.set(true);
    this.selectCategory(this.incomeCategories[0]);
  }

  toggleExpenseTab() {
    this.transactionType.set('Expense');
    this.isExpenseTabOpen.set(true);
    this.isIncomeTabOpen.set(false);
    this.selectCategory(this.expenseCategories[0]);
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.selectSubcategory(category.subcategories[0]);

    this.transactionForm.patchValue({
      category: this.selectedCategory.name,
      subCategory: this.selectedSubcategory.name
    });
  }

  selectSubcategory(subcategory: Subcategory) {
    this.selectedSubcategory = subcategory;

    this.transactionForm.patchValue({
      subCategory: this.selectedSubcategory.name
    });
  }
  

  /** Amount Input Handlers */
  stripFormatting() {
    const value = this.amountControl.value;
    if (typeof value === 'string') {
      this.amountControl.setValue(value.replace(/[^0-9.]/g, ''));
    }
  }

  /** Format as $XX.XX on blur */
  formatAmount() {
    let rawValue = this.amountControl.value;

    if (!rawValue || isNaN(Number(rawValue))) {
      this.amountControl.setValue('');
      return;
    }

    const numericValue = parseFloat(rawValue).toFixed(2);
    this.amountControl.setValue(`$${numericValue}`);

    if (this.transactionType() === 'Income') {
      this.amount = parseFloat(rawValue);
    } else {
      this.amount = -Math.abs(parseFloat(rawValue));
    }
    
  }

  async save() {
    if (this.transactionForm.valid) {
      const formValue = this.transactionForm.value;

      if (this.editing) {
        const tx = this.txs.selectedTransaction()!;
        await this.txs.update(tx.id, formValue);
        this.txs.setSelectedTransaction(null);
      } else {
        await this.txs.create(formValue as Transaction);
      }

      this.closeSelf();
      this.txs.refresh();
    }
  }
}
