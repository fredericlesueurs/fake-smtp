import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

const COUNT_EMAILS = gql`
  query CountEmails {
    countEmails
  }
`;

type CountEmail = {
  countEmails: number;
}

@Component({
  selector: 'left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit, OnDestroy {
  loading?: boolean;
  emailsNumber?: number;

  private querySubscription?: Subscription;

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
      this.querySubscription = this.apollo.watchQuery<CountEmail>({
        query: COUNT_EMAILS,
      }).valueChanges.subscribe(({data, loading}) => {
        this.loading = loading;
        this.emailsNumber = data.countEmails;
      });
  }

  ngOnDestroy(): void {
    this.querySubscription?.unsubscribe();
  }
}
